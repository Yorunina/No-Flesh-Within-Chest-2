// priority: 3000

import { chunk } from "underscore"

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
 * 
 * @param {Internal.ServerLevel} level 
 * @param {BlockPos} pos 
 * @param {string} structureId
 * @returns 
 */
function GenerateStructureByCenter(level, pos, structureId) {
    let structManager = level.getStructureManager()
    let structTemplate = structManager.getOrCreate(new ResourceLocation(structureId))
    let structSizeRange = ConvertVec3i2BlockPos(structTemplate.getSize())
    let structBuildPos = new BlockPos(pos.x - structSizeRange.x / 2, pos.y, pos.z - structSizeRange.z / 2)
    let chunkAccess = GetChunkAccess(level, structBuildPos)
    if (!chunkAccess) return
    let placementSettings = new $StructurePlaceSettings().setMirror($Mirror.NONE).setRotation($Rotation.NONE).setIgnoreEntities(false)
    structTemplate.placeInWorld(level, structBuildPos, structSizeRange, placementSettings, level.getRandom(), 2)
}
