// priority: 2000
/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.Area} area 
 */
function DoPurifyAction(level, area) {
    const obeliskBlockPos = GetAreaObeliskBlockPos(area)
    if (!obeliskBlockPos) return
    const obeliskBlockEntity = level.getBlockEntity(obeliskBlockPos)
    if (!area.persistentData.contains('purifyActionType')) return
    let purifyActionType = area.persistentData.getString('purifyActionType')
    switch (purifyActionType) {
        case 'preset_skyland':
            genPresetSkyland(level, obeliskBlockPos)
            break
        case 'gen_sphere':

            break
        case 'addition_loot':
            break
    }
}


const DUNGEON_DIM = new ResourceLocation('kubejs:dungeon')

const STRUCT_BUILD_INTERVAL = 48

const X_SIDE_MODIFIER = [0, -1, 0, 1]
const Z_SIDE_MODIFIER = [1, 0, -1, 0]
const X_POINT_MODIFIER = [1, 1, -1, -1]
const Z_POINT_MODIFIER = [-1, 1, 1, -1]

const PresetSkylandStructureFileLocation = 'kubejs/data/kubejs/structures/preset_skyland'
const PresetSkylandStructIdList = []
if (FilesJS.exists(PresetSkylandStructureFileLocation)) {
    FilesJS.listFilesRecursively(PresetSkylandStructureFileLocation).forEach(file => {
        if (file.endsWith('.nbt')) {
            let reg = new RegExp(/structures\\(\S+)\.nbt/)
            if (!reg.test(file)) return
            let res = 'kubejs:' + RegExp.$1
            res = res.replace('\\', '/')
            PresetSkylandStructIdList.push(res)
        }
    })
}

/**
 * @param {Internal.Level} level
 * @param {Internal.StructureTemplate} template 
 * @param {BlockPos} position
 * @param {BlockPos} centerPos
 * @param {Internal.StructurePlaceSettings} placementSettings
 * @param {DungeonAttributeModel} dungeonAttr
 */
function HandleDataBlock(level, template, position, centerPos, placementSettings, dungeonAttr) {
    // 结构行为
    template.filterBlocks(position, placementSettings, Blocks.STRUCTURE_BLOCK).forEach(block => {
        let blockPos = block.pos()
        if (block.nbt()) {
            let structureMode = $StructureMode.valueOf(block.nbt().getString('mode'))
            if (structureMode == $StructureMode.DATA) {
                let metaData = block.nbt().getString('metadata')
                let metaDataJsonObj = JsonIO.parseRaw(metaData).getAsJsonObject()
                if (!metaDataJsonObj.has('mode')) return
                let mode = metaDataJsonObj.get('mode').getAsString()
                switch (mode) {
                    case 'spawn_obelisk':
                        let obeliskBlockLowerState = Block.getBlock('kubejs:dungeon_obelisk').defaultBlockState().setValue(BlockProperties.DOUBLE_BLOCK_HALF, $DoubleBlockHalf.LOWER)
                        let obeliskBlockUpperState = Block.getBlock('kubejs:dungeon_obelisk').defaultBlockState().setValue(BlockProperties.DOUBLE_BLOCK_HALF, $DoubleBlockHalf.UPPER)

                        level.setBlock(blockPos, obeliskBlockLowerState, 3)
                        level.setBlock(blockPos.above(1), obeliskBlockUpperState, 3)
                        let obeliskBlockLowerEntity = level.getBlockEntity(blockPos)
                        let persistentData = obeliskBlockLowerEntity.getPersistentData()
                        dungeonAttr.serializeToNBT(persistentData)
                        obeliskBlockLowerEntity.setChanged()
                }
            }
        }
        return
    })
}


function GetRandomStructPlacingSettings() {
    // let mirror = RandomGet([$Mirror.NONE, $Mirror.LEFT_RIGHT, $Mirror.FRONT_BACK])
    // let rotation = RandomGet([$Rotation.NONE, $Rotation.CLOCKWISE_90, $Rotation.CLOCKWISE_180, $Rotation.COUNTERCLOCKWISE_90])
    //.setMirror(mirror).setRotation(rotation)
    return new $StructurePlaceSettings().setIgnoreEntities(false)
}
/**
 * 
 * @param {Internal.ServerLevel} level 
 * @param {Internal.BlockEntity} blockEntity  
 * @returns
 */
function genPresetSkyland(level, blockEntity) {
    let genPos = getPurifyGenBlockPos(level, blockEntity)
    const structManager = level.getStructureManager()
    let structId = RandomGet(PresetSkylandStructIdList)
    let structTemplateOpt = structManager.get(new ResourceLocation(structId))
    if (!structTemplateOpt.isPresent()) return
    let structTemplate = structTemplateOpt.get()
    let structSize = structTemplate.getSize()
    let structCenterPos = genPos.add(structSize.x() / 2, structSize.y() / 2, structSize.z() / 2)
    let structPlacingSettings = GetRandomStructPlacingSettings()
    structTemplate.placeInWorld(level, genPos, structCenterPos, structPlacingSettings, level.getRandom(), 0)
    purifyBiome(level, blockEntity, genPos)
}

/**
 * 
 * @param {Internal.ServerLevel} level 
 * @param {Internal.BlockEntity} blockEntity 
 * @param {BlockPos} genPos 
 */
function purifyBiome(level, blockEntity, genPos) {
    for (let x = genPos.getX() - radius; x <= genPos.getX() + radius; x += 16) {
        for (let z = genPos.getZ() - radius; z <= genPos.getZ() + radius; z += 16) {
            let chunkAccess = level.getChunk(x >> 4, z >> 4)
            // todo 关联生态群系
            SetBiomeByChunk(level, chunkAccess, 'minecraft:plains')
        }
    }
}



/**
 * @param {Internal.ServerLevel} level 
 * @param {Internal.BlockEntity} blockEntity
 * @return {BlockPos}
 */
function getPurifyGenBlockPos(level, blockEntity) {
    const startPos = blockEntity.getBlockPos()
    const persistentData = blockEntity.getPersistentData()
    let purifyNum = persistentData.contains('purifyNum') ? persistentData.getInt('purifyNum') : 0
    const buildOffset = calculateStructureBuildPos(startPos, purifyNum)
    return new BlockPos(
        buildOffset.getX() * STRUCT_BUILD_INTERVAL + startPos.getX(),
        level.getSeaLevel(),
        buildOffset.getZ() * STRUCT_BUILD_INTERVAL + startPos.getZ()
    )
}

/**
 * 
 * @param {number} n 
 * @returns {BlockPos}
 */
function calculateStructureBuildPos(n) {
    if (n == 0) return BlockPos.ZERO
    let rad = Math.floor((Math.pow(n, 1 / 2) + 1) / 2)
    let perimeter = 8 * rad
    let sideLength = 2 * rad + 1
    let left = perimeter - Math.pow(sideLength, 2) + n
    let sideNum = Math.floor(left / (sideLength - 1))
    let moveNum = left - (sideLength - 1) * sideNum
    let x = rad * X_POINT_MODIFIER[sideNum] + X_SIDE_MODIFIER[sideNum] * moveNum
    let z = rad * Z_POINT_MODIFIER[sideNum] + Z_SIDE_MODIFIER[sideNum] * moveNum
    return new BlockPos(x, 0, z)
}
