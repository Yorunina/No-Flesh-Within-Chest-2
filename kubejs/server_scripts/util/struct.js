// priority: 999

const DUNGEON_DIM = new ResourceLocation('kubejs:dungeon')

// todo 确认是否需要如此大的范围
const ISLAND_SIDE_LENGTH = 48
const ISLAND_BUILD_INTERVAL = 128
const ISLAND_BUILD_RANDOM_OFFSET = 24

const MAINISLAND_TEMPLATE_LIST = ['kubejs:test']

/**
 * 获取某维度的某坐标对应的Chunk信息
 * @param {Internal.Level} level
 * @param {BlockPos} pos
 * @returns {Internal.LevelChunk}
 */
function GetChunkAccess(level, pos) {
    let chunkAccess = level.getChunkAt(pos)
    return chunkAccess
}

/**
 * @param {Internal.Level} level 
 * @param {Object<string, Internal.ChunkAccess>} chunkMap 
 * @param {BlockPos} pos 
 */
function GetChunkFromMap(level, chunkMap, pos) {
    let chunkX = Math.floor(pos.x / 16)
    let chunkZ = Math.floor(pos.z / 16)
    let chunkKey = chunkX + ',' + chunkZ
    let chunkAccess = chunkMap[chunkKey]
    if (!chunkAccess) {
        chunkAccess = level.getChunk(chunkX, chunkZ, $ChunkStatus.FULL, true)
        chunkMap[chunkKey] = chunkAccess
    }
    return chunkAccess
}

/**
 * @param {Internal.Level} level 
 * @return {BlockPos}
 */
function GenDungeonIslands(level) {
    let minecraftServer = level.getServer()
    let dungeonLevel = minecraftServer.getLevel(DUNGEON_DIM)
    let dungeonStructManager = dungeonLevel.getStructureManager()
    let dungeonNum = 0
    if (dungeonLevel.persistentData.contains('islandNum')) {
        dungeonNum = dungeonLevel.persistentData.getInt('islandNum')
    }
    
    console.log('Generate Dungeon Island', dungeonNum)
    let buildOffset = calculateStructureCenterPos(dungeonNum)
    console.log(buildOffset)
    let buildX = buildOffset.x * ISLAND_BUILD_INTERVAL + Math.random() * ISLAND_BUILD_RANDOM_OFFSET
    let buildZ = buildOffset.z * ISLAND_BUILD_INTERVAL + Math.random() * ISLAND_BUILD_RANDOM_OFFSET
    console.log('buildX:', buildX, 'buildZ:', buildZ)
    let mainIslandId = RandomGet(MAINISLAND_TEMPLATE_LIST)

    let mainIslandTemplate = dungeonStructManager.getOrCreate(new ResourceLocation(mainIslandId))
    let mainIslandSizeRange = ConvertVec3i2BlockPos(mainIslandTemplate.getSize())
    let mainIslandBuildPos = new BlockPos(buildX, 0, buildZ)

    let chunkAccess = GetChunkAccess(dungeonLevel, mainIslandBuildPos)
    if (!chunkAccess) return

    // 主岛
    let placementSettings = new $StructurePlaceSettings().setMirror($Mirror.NONE).setRotation($Rotation.NONE).setIgnoreEntities(false)
    mainIslandTemplate.placeInWorld(dungeonLevel, mainIslandBuildPos, mainIslandSizeRange, placementSettings, dungeonLevel.getRandom(), 2)
    HandleDataBlock(level, mainIslandTemplate, mainIslandBuildPos, placementSettings)


    dungeonLevel.persistentData.putInt('islandNum', dungeonNum + 1)
    return mainIslandBuildPos
}

/**
 * @param {Vec3i} vec3i 
 * @returns {BlockPos}
 */
function ConvertVec3i2BlockPos(vec3i) {
    return new BlockPos(vec3i.x, vec3i.y, vec3i.z)
}

/**
 * @param {BlockPos} blockPos 
 * @returns {Vec3d}
 */
function ConvertBlockPos2Vec3d(blockPos) {
    return new Vec3d(blockPos.x, blockPos.y, blockPos.z)
}

/**
 * @param {Internal.Level} level
 * @param {Internal.StructureTemplate} template 
 * @param {BlockPos} position
 * @param {Internal.StructurePlaceSettings} placementSettings
 */
function HandleDataBlock(level, template, position, placementSettings) {
    // 结构行为
    template.filterBlocks(position, placementSettings, Blocks.STRUCTURE_BLOCK).forEach(block => {
        if (block.nbt()) {
            let structureMode = $StructureMode.valueOf(block.nbt().getString('mode'))
            if (structureMode == $StructureMode.DATA) {
                let nbt = ConvertPos2Nbt(position.above(10))
                let nextLevelBlock = Block.getBlock('kubejs:locker_block').defaultBlockState()
                level.setBlock(block.pos(), nextLevelBlock, 3)
                let spawnedBlock = level.getBlock(block.pos())
                spawnedBlock.entity.persistentData.put('SpawnPos', nbt)
                spawnedBlock.entity.setChanged()
            }
        }
        return
    })
}


/**
 * 在某区块
 * @param {Internal.ServerLevel} level 
 * @param {Internal.ChunkAccess} chunkAccess
 * @param {string} biomeName
 */
function SetBiomeByChunk(level, chunkAccess, biomeName) {
    let levelBiomeRegistryOpt = level.registryAccess().registry($Registries.BIOME)
    if (!levelBiomeRegistryOpt.isPresent()) return
    
    let biomeHolderOpt = levelBiomeRegistryOpt.get().getHolder($ResourceKey.create($Registries.BIOME, new ResourceLocation(biomeName)))
    if (!biomeHolderOpt.isPresent()) return
    let biomeHolder = biomeHolderOpt.get()

    chunkAccess.getSections().forEach(section => {
        let biomes = section.getBiomes()
        if (biomes instanceof $PalettedContainer) {
            let biomeId = biomes.data.palette().idFor(biomeHolder)
            let size = biomes.data.storage().getSize()
            let i = 0
            while (i <= (size - 1)) {
                biomes.data.storage().set(i, biomeId)
                i++
            }
        }
    })
    chunkAccess.setUnsaved(true)
}


const X_SIDE_MODIFIER = [0, -1, 0, 1]
const Z_SIDE_MODIFIER = [1, 0, -1, 0]
const X_POINT_MODIFIER = [1, 1, -1, -1]
const Z_POINT_MODIFIER = [-1, 1, 1, -1]
/**
 * 
 * @param {number} n 
 * @returns {{x: number, z: number}}
 */
function calculateStructureCenterPos(n) {
    if (n == 0) return {x: 0, z: 0}
    let rad = Math.floor((Math.pow(n, 1 / 2) + 1) / 2)
    let perimeter = 8 * rad
    let sideLength = 2 * rad + 1
    let left = perimeter - Math.pow(sideLength, 2) + n
    let sideNum = Math.floor(left / (sideLength - 1))
    let moveNum = left - (sideLength - 1) * sideNum
    let x = rad * X_POINT_MODIFIER[sideNum] + X_SIDE_MODIFIER[sideNum] * moveNum
    let z = rad * Z_POINT_MODIFIER[sideNum] + Z_SIDE_MODIFIER[sideNum] * moveNum
    return {x: x, z: z}
}