// priority: 4000

/**
 * 检查目标后尝试催熟，成功时生成粒子；consumeItem 为真时走骨粉物品钩子。
 * @param {Internal.ServerLevel} level
 * @param {Internal.BlockPos} pos
 * @param {Internal.LivingEntity} player
 * @param {string} particle
 * @param {boolean} [consumeItem=false]
 * @returns {boolean}
 */
function TryBonemeal(level, pos, player, particle, consumeItem) {
    if (!level.hasChunkAt(pos)) return false
    let state = level.getBlockState(pos)
    let block = state.block
    if (!(block instanceof $BonemealableBlock)) return false
    if (!block.isValidBonemealTarget(level, pos, state, false)) return false
    let applied = false
    if (consumeItem) {
        applied = $BoneMealItem.applyBonemeal(Item.of('minecraft:bone_meal'), level, pos, player)
    } else if (block.isBonemealSuccess(level, level.random, pos, state)) {
        block.performBonemeal(level, level.random, pos, state)
        applied = true
    }
    if (!applied) return false
    level.spawnParticles(particle, true, pos.x + 0.2, pos.y + 0.3, pos.z - 0.4, 0, 0.1, 0, 2, 0)
    level.spawnParticles(particle, true, pos.x + 0.1, pos.y + 0.2, pos.z + 0.3, 0, 0.1, 0, 2, 0)
    return true
}
