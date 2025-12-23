// priority: 3000
/**
 * @callback isValidBlockTarget
 * @param {Internal.BlockContainerJS}
 * @returns {Boolean}
 */
/**
 * 在某个范围内寻找符合条件的方块
 * @param {Internal.BlockContainerJS} block 
 * @param {number} searchRange 
 * @param {number} verticalSearchRange 
 * @param {isValidBlockTarget} isValidTarget
 * @returns {Internal.BlockContainerJS[]}
 */
function FindBlocksAroundBlock(block, searchRange, verticalSearchRange, isValidTarget) {
    let blockPos = block.pos
    let resBlockList = []
    let level = block.level
    // Y遍历
    for (let k = 0; k <= verticalSearchRange; k = k > 0 ? -k : 1 - k) {
        // X-Z遍历
        for (let l = 0; l <= searchRange; ++l) {
            for (let i = 0; i <= l; i = i > 0 ? -i : 1 - i) {
                for (let j = i < l && i > -l ? l : 0; j <= l; j = j > 0 ? -j : 1 - j) {
                    let curBlock = level.getBlock(blockPos.x + i, blockPos.y + k, blockPos.z + j)
                    if (isValidTarget(curBlock)) {
                        resBlockList.push(curBlock)
                    }
                }
            }
        }
    }
    return resBlockList
}


/**
 * 在某个范围内寻找符合条件的方块
 * @param {Internal.BlockContainerJS} block 
 * @param {number} searchRange 
 * @param {number} verticalSearchRange 
 * @param {isValidBlockTarget} isValidTarget
 * @returns {Internal.BlockContainerJS}
 */
function FindNearestBlockAroundBlock(block, searchRange, verticalSearchRange, isValidTarget) {
    let blockPos = block.pos
    let level = block.level
    // Y遍历
    for (let k = 0; k <= verticalSearchRange; k = k > 0 ? -k : 1 - k) {
        // X-Z遍历
        for (let l = 0; l <= searchRange; ++l) {
            for (let i = 0; i <= l; i = i > 0 ? -i : 1 - i) {
                for (let j = i < l && i > -l ? l : 0; j <= l; j = j > 0 ? -j : 1 - j) {
                    let curBlock = level.getBlock(blockPos.x + i, blockPos.y + k, blockPos.z + j)
                    if (isValidTarget(curBlock)) {
                        return curBlock
                    }
                }
            }
        }
    }
    return null
}

/**
 * 生成一个随机的Lootr Chest
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @param {ResourceLocation} table 
 */
function GenLootrChestWithLootTable(level, pos, table) {
    let placementState = Block.getBlock('minecraft:chest').defaultBlockState()
    level.setBlock(pos, placementState, 2)
    $RandomizableContainerBlockEntity.setLootTable(level, level.getRandom(), pos, table)
}

/**
 * 生成一个随机的MonoBank并返回实体
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @returns {Internal.MonobankLock}
 */
function GenerateMonoBankWithLock(level, pos) {
    level.setBlockAndUpdate(pos, Block.getBlock('monobank:monobank').defaultBlockState())
    return level.getBlockEntity(pos)
}


/**
 * 
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 */
function PlaceLightBlock(level, pos) {
    level.setBlockAndUpdate(pos, Block.getBlock('ars_nouveau:light_block').defaultBlockState())
}

/**
 * 
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @param {Internal.ParticleColor} color
 */
function ChangeLightBlockColor(level, pos, color) {
    let lightTile = level.getBlockEntity(pos)
    if (lightTile instanceof $LightTile) {
        lightTile.setColor(color)
    }
}