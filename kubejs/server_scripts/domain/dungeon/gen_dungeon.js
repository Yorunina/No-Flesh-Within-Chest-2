// priority: 800

const DUNGEON_DIM = new ResourceLocation('kubejs:dungeon')

// todo 确认是否需要如此大的范围
const STRUCT_SIDE_LENGTH = 48
const STRUCT_BUILD_INTERVAL = 128
const STRUCT_BUILD_RANDOM_OFFSET = 24

const X_SIDE_MODIFIER = [0, -1, 0, 1]
const Z_SIDE_MODIFIER = [1, 0, -1, 0]
const X_POINT_MODIFIER = [1, 1, -1, -1]
const Z_POINT_MODIFIER = [-1, 1, 1, -1]
const DungeonStructureFileLocation = 'kubejs/data/kubejs/structures/infinity_dungeon'


function GetRandomDungeonStructureId() {
    const dungeonStructureIdList = []
    if (!FilesJS.exists(DungeonStructureFileLocation)) return
    FilesJS.listFilesRecursively(DungeonStructureFileLocation).forEach(file => {
        if (file.endsWith('.nbt')) {
            let reg = new RegExp(/structures\\(\S+)\.nbt/)
            if (!reg.test(file)) return
            let res = 'kubejs:' + RegExp.$1
            res = res.replace('\\', '/')
            dungeonStructureIdList.push(res)
        }
    })
    return RandomGet(dungeonStructureIdList)
}
/**
 * @param {Internal.ServerLevel} level 
 * @return {BlockPos}
 */
function GenDungeonStruct(level) {
    let dungeonStructManager = level.getStructureManager()
    let dungeonNum = 0
    if (level.persistentData.contains('dungeonNum')) {
        dungeonNum = level.persistentData.getInt('dungeonNum')
    }
    let buildOffset = calculateStructureCenterPos(dungeonNum)
    let buildX = buildOffset.x * STRUCT_BUILD_INTERVAL + Math.random() * STRUCT_BUILD_RANDOM_OFFSET
    let buildZ = buildOffset.z * STRUCT_BUILD_INTERVAL + Math.random() * STRUCT_BUILD_RANDOM_OFFSET
    let structId = GetRandomDungeonStructureId()
    let structTemplate = dungeonStructManager.getOrCreate(new ResourceLocation(structId))
    let structSizeRange = ConvertVec3i2BlockPos(structTemplate.getSize())
    let structBuildPos = new BlockPos(buildX, 0, buildZ)
    let chunkAccess = GetChunkAccess(level, structBuildPos)
    if (!chunkAccess) return

    let placementSettings = new $StructurePlaceSettings().setMirror($Mirror.NONE).setRotation($Rotation.NONE).setIgnoreEntities(false)
    structTemplate.placeInWorld(level, structBuildPos, structSizeRange, placementSettings, level.getRandom(), 2)

    HandleDataBlock(level, structTemplate, structBuildPos, placementSettings)

    level.persistentData.putInt('dungeonNum', dungeonNum + 1)
    
    return structBuildPos.offset(structSizeRange.x / 2, 2, structSizeRange.z / 2)
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
                // let metaData = block.nbt().getString('metadata')
                // let metaDataJsonObj = JsonIO.parseRaw(metaData).getAsJsonObject()
                // if (!metaDataJsonObj.has('mode')) return
                // let mode = metaDataJsonObj.get('mode').getAsString()
                // switch (mode) {
                // }
                // let nbt = ConvertPos2Nbt(position.above(10))
                // let nextLevelBlock = Block.getBlock('kubejs:locker_block').defaultBlockState()
                // level.setBlock(block.pos(), nextLevelBlock, 3)
                // let spawnedBlock = level.getBlock(block.pos())
                // spawnedBlock.entity.persistentData.put('SpawnPos', nbt)
                // spawnedBlock.entity.setChanged()
            }
        }
        return
    })
}

/**
 * 
 * @param {number} n 
 * @returns {{x: number, z: number}}
 */
function calculateStructureCenterPos(n) {
    if (n == 0) return { x: 0, z: 0 }
    let rad = Math.floor((Math.pow(n, 1 / 2) + 1) / 2)
    let perimeter = 8 * rad
    let sideLength = 2 * rad + 1
    let left = perimeter - Math.pow(sideLength, 2) + n
    let sideNum = Math.floor(left / (sideLength - 1))
    let moveNum = left - (sideLength - 1) * sideNum
    let x = rad * X_POINT_MODIFIER[sideNum] + X_SIDE_MODIFIER[sideNum] * moveNum
    let z = rad * Z_POINT_MODIFIER[sideNum] + Z_SIDE_MODIFIER[sideNum] * moveNum
    return { x: x, z: z }
}