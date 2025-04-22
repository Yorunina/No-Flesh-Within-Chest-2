// priority: 2000
const DUNGEON_DIM = new ResourceLocation('kubejs:dungeon')

// todo 确认是否需要如此大的范围
const STRUCT_SIDE_LENGTH = 48
const STRUCT_BUILD_INTERVAL = 128
const STRUCT_BUILD_RANDOM_OFFSET = 24

const X_SIDE_MODIFIER = [0, -1, 0, 1]
const Z_SIDE_MODIFIER = [1, 0, -1, 0]
const X_POINT_MODIFIER = [1, 1, -1, -1]
const Z_POINT_MODIFIER = [-1, 1, 1, -1]

const MainSkylandStructureFileLocation = 'kubejs/data/kubejs/structures/main_skyland'
const SideSkylandStructureFileLocation = 'kubejs/data/kubejs/structures/side_skyland'

const MainSkylandStructIdList = []
const SideSkylandStructIdList = []
// if (FilesJS.exists(MainSkylandStructureFileLocation)) {
//     FilesJS.listFilesRecursively(MainSkylandStructureFileLocation).forEach(file => {
//         if (file.endsWith('.nbt')) {
//             let reg = new RegExp(/structures\\(\S+)\.nbt/)
//             if (!reg.test(file)) return
//             let res = 'kubejs:' + RegExp.$1
//             res = res.replace('\\', '/')
//             MainSkylandStructIdList.push(res)
//         }
//     })
// }
// if (FilesJS.exists(SideSkylandStructureFileLocation)) {
//     FilesJS.listFilesRecursively(SideSkylandStructureFileLocation).forEach(file => {
//         if (file.endsWith('.nbt')) {
//             let reg = new RegExp(/structures\\(\S+)\.nbt/)
//             if (!reg.test(file)) return
//             let res = 'kubejs:' + RegExp.$1
//             res = res.replace('\\', '/')
//             SideSkylandStructIdList.push(res)
//         }
//     })
// }

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

/**
 * 
 * @param {number} n 
 * @returns {BlockPos}
 */
function calculateStructureBuildPos(n) {
    if (n == 0) return { x: 0, z: 0 }
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


/**
 * @param {Internal.ServerLevel} level 
 * @param {DungeonAttributeModel} dungeonAttr
 * @return {Object}
 */
function GenSkylandStruct(level, dungeonAttr) {
    const dungeonStructManager = level.getStructureManager()
    let dungeonNum = 0
    if (level.getPersistentData().contains('dungeonNum')) {
        dungeonNum = level.getPersistentData().getInt('dungeonNum')
    }
    const buildOffset = calculateStructureBuildPos(dungeonNum)
    const startPos = new BlockPos(
        buildOffset.getX() * STRUCT_BUILD_INTERVAL,
        0,
        buildOffset.getZ() * STRUCT_BUILD_INTERVAL
    )


    const seaLevel = level.getSeaLevel()
    /**@type {Internal.BoundingBox[]} */
    const boundingBoxList = []

    // 主岛
    if (MainSkylandStructIdList.length == 0) return null
    const mainSkylandId = RandomGet(MainSkylandStructIdList)
    const mainSkylandTemplate = dungeonStructManager.getOrCreate(new ResourceLocation(mainSkylandId))
    const mainSkylandSize = ConvertVec3i2BlockPos(mainSkylandTemplate.getSize())
    const mainSkylandPos = new BlockPos(
        startPos.getX() + Math.random() * STRUCT_BUILD_INTERVAL - mainSkylandSize.getX(),
        Math.min(Math.ceil(seaLevel + Math.random() * 50 - 30), level.getMaxBuildHeight()) - mainSkylandSize.getY(),
        startPos.getZ() + Math.random() * STRUCT_BUILD_INTERVAL - mainSkylandSize.getZ(),
    )

    const mainSkylandSetting = GetRandomStructPlacingSettings()
    mainSkylandTemplate.getZeroPositionWithTransform(mainSkylandPos, mainSkylandSetting.getMirror(), mainSkylandSetting.getRotation())

    boundingBoxList.push(mainSkylandTemplate.getBoundingBox(mainSkylandSetting, mainSkylandPos))
    let mainSkylandCenterPos = new BlockPos(
        mainSkylandPos.getX() + mainSkylandSize.getX() / 2,
        0,
        mainSkylandPos.getZ() + mainSkylandSize.getZ() / 2,
    )

    let chunkX = Math.floor(mainSkylandCenterPos.getX() / 16)
    let chunkZ = Math.floor(mainSkylandCenterPos.getZ() / 16)
    let blockX = mainSkylandCenterPos.getX() % 16
    let blockZ = mainSkylandCenterPos.getZ() % 16

    let mainSkylandChunk = level.getChunk(chunkX, chunkZ, $ChunkStatus.SURFACE, true)
    if (!mainSkylandChunk) return null

    let res = mainSkylandTemplate.placeInWorld(level, mainSkylandPos, mainSkylandSize, mainSkylandSetting, level.getRandom(), 2)

    if (!res) return null
    HandleDataBlock(level, mainSkylandTemplate, mainSkylandPos, mainSkylandCenterPos, mainSkylandSetting, dungeonAttr)
    level.getPersistentData().putInt('dungeonNum', dungeonNum + 1)
    let y = Math.min(mainSkylandChunk.getHeight('motion_blocking', blockX, blockZ), level.getMaxBuildHeight())
    mainSkylandCenterPos = mainSkylandCenterPos.atY(y)
    if (y <= -64) {
        mainSkylandCenterPos = mainSkylandCenterPos.atY(64)
        level.setBlockAndUpdate(mainSkylandCenterPos.atY(62), Blocks.SNOW_BLOCK.defaultBlockState())
    }
    

    // 副岛
    for (let i = 0; i < 4; i++) {
        if (SideSkylandStructIdList.length == 0) break
        let sideSkylandId = RandomGet(SideSkylandStructIdList)
        let sideSkylandTemplate = dungeonStructManager.getOrCreate(new ResourceLocation(sideSkylandId))
        let sideSkylandSize = ConvertVec3i2BlockPos(sideSkylandTemplate.getSize())
        let sideSkylandPos = new BlockPos(
            startPos.getX() + Math.random() * STRUCT_BUILD_INTERVAL - sideSkylandSize.getX(),
            Math.min(Math.ceil(seaLevel + Math.random() * 100 - 30), level.getMaxBuildHeight()) - sideSkylandSize.getY(),
            startPos.getZ() + Math.random() * STRUCT_BUILD_INTERVAL - sideSkylandSize.getZ(),
        )
        let sideSkylandSetting = GetRandomStructPlacingSettings()
        let sideSkylandBoundingBox = sideSkylandTemplate.getBoundingBox(sideSkylandSetting, sideSkylandPos)
        // 检测是否与主岛重叠
        let isValid = true
        for (let i = 0; i < boundingBoxList.length; i++) {
            if (boundingBoxList[i].intersects(sideSkylandBoundingBox)) {
                isValid = false
                break
            }
        }
        if (!isValid) continue
        if (!GetChunkAccess(level, sideSkylandPos)) continue
        sideSkylandTemplate.placeInWorld(level, sideSkylandPos, sideSkylandSize, sideSkylandSetting, level.getRandom(), 2)
        boundingBoxList.push(sideSkylandBoundingBox)
    }

    return mainSkylandCenterPos
}


function GetRandomStructPlacingSettings() {
    // let mirror = RandomGet([$Mirror.NONE, $Mirror.LEFT_RIGHT, $Mirror.FRONT_BACK])
    // let rotation = RandomGet([$Rotation.NONE, $Rotation.CLOCKWISE_90, $Rotation.CLOCKWISE_180, $Rotation.COUNTERCLOCKWISE_90])
    //.setMirror(mirror).setRotation(rotation)
    return new $StructurePlaceSettings().setIgnoreEntities(false)
}