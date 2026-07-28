// priority: 850
/** 
 * 判断是否为上球壳
 * @type {function(BlockPos)}
 */
const IsUpShell = (offset) => {
    return offset.y >= 0
}

/** 
 * 判断是否为下球壳
 * @type {function(BlockPos)}
 */
const IsDownShell = (offset) => {
    return offset.y <= 0
}

/**
 * 概率生成
 * @type {function(number)}
 */
const RandomChance = (chance) => {
    return Math.random() < chance
}

/**
 * 方块上方为空
 * @type {function(Internal.Level, SphereModel, BlockPos, number)}
 */
const IsUpEmptyWithinHeight = (level, sphere, offset, height) => {
    for (let y = 1; y <= height; y++) {
        if (!level.getBlockState(sphere.center.offset(offset).above(y)).isAir()) {
            return false
        }
    }
    return true
}