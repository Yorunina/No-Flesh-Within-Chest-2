// priority: 3000
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
 * @param {Internal.StructureTemplate} template 
 * @param {BlockPos} position
 * @param {Internal.StructurePlaceSettings} placementSettings
 */
function HandleDataBlock(template, position, placementSettings) {
    // 结构行为
    template.filterBlocks(position, placementSettings, Blocks.STRUCTURE_BLOCK).forEach(block => {
        if (block.nbt()) {
            let structureMode = $StructureMode.valueOf(block.nbt().getString('mode'))
            if (structureMode == $StructureMode.DATA) {

            }
        }
        return
    })
}


/**
 * 在某区块设置生态群系
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