// priority: 3000
/**
 * @param {number} num 
 * @returns
 */
function SetDaySpeed(num) {
    $HourglassConfig.SERVER_CONFIG.daySpeed.set(num)
}
/**
 * @param {number} num 
 * @returns 
 */
function SetNightSpeed(num) {
    $HourglassConfig.SERVER_CONFIG.nightSpeed.set(num)
}

function GetDaySpeed() {
    return $HourglassConfig.SERVER_CONFIG.daySpeed.get()
}

function GetNightSpeed() {
    return $HourglassConfig.SERVER_CONFIG.nightSpeed.get()
}


/**
 * 获取chunkPos对应的所有结构资源键
 * @param {Internal.ServerLevel} level 
 * @param {Internal.ChunkPos} chunkPos 
 * @returns {Internal.ResourceKey[]}
 */
function GetChunkStructureResourceKeys(level, chunkPos) {
    let result = []
    let structList = level.structureManager().startsForStructure(chunkPos, _ => true)
    structList.forEach(pStruct => {
        let key = $ResourceKey.create($Registries.STRUCTURE, level.registryAccess().registryOrThrow($Registries.STRUCTURE).getKey(pStruct.getStructure()))
        result.push(key)
    })
    return result
}

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
        chunkAccess = level.getChunk(chunkX, chunkZ, 'full', true)
        chunkMap[chunkKey] = chunkAccess
    }
    return chunkAccess
}


/**
 * 在某区块设定生态群系
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

/**
 * 检查目标位置是否在任何结构中
 * @param {Internal.ServerLevel} level 
 * @param {BlockPos} targetPos 
 * @returns {Internal.ResourceKey}
 */
function GetPosInSturcture(level, targetPos) {
    const x = targetPos.getX()
    const y = targetPos.getY()
    const z = targetPos.getZ()

    let chunkPos = new $ChunkPos(x >> 4, z >> 4)
    let structList = level.structureManager().startsForStructure(chunkPos, _ => true)
    for (let pStruct of structList) {
        let key = $ResourceKey.create($Registries.STRUCTURE, level.registryAccess().registryOrThrow($Registries.STRUCTURE).getKey(pStruct.getStructure()))
        if ($LocationPredicate.inStructure(key).matches(level, x, y, z)) {
            return key
        }
    }
    return null
}


/**
 * 
 * @param {Internal.Level} level 
 * @param {Vec3d} start 
 * @param {number} maxSteps 
 * @returns {number}
 */
function GetGroundLevel(level, start, maxSteps) {
    if (!level.getBlockState(BlockPos.containing(start)).isAir()) {
        for (let i = 0; i < maxSteps; i++) {
            start = start.add(0, 1, 0)
            if (level.getBlockState(BlockPos.containing(start)).isAir()) {
                break
            }
        }
    }
    let lower = level.clip(new $ClipContext(start, start.add(0, maxSteps * -2, 0), $ClipContextBlock.COLLIDER, $ClipContextFluid.NONE, null)).getLocation()
    return lower.getY()
}