// priority: 999
function NewLayLootGoal(entity) {
    return new $CustomGoal(
        'lay_loot',
        entity,
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 何时能够使用
            const level = mob.level
            if (mob.persistentData.getInt('layLootTimer') > level.time) return false
            let selectBlock = FindNearestBlock(mob, 6, 2, 0, (curBlock) => {
                return LayLootGoalIsLayableBlock(curBlock)
            })
            return selectBlock != null
        },
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 能否继续使用 
            const level = mob.level
            return mob.persistentData.getInt('layLootTimer') <= level.time
        },
        true, // 是否允许中断
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 开启时执行
        },
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 停止时执行
        },
        false, // 是否每个tick都需要更新
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // tick
            const level = mob.level
            let selectBlock = FindNearestBlock(mob, 6, 2, 0, (curBlock) => {
                return LayLootGoalIsLayableBlock(curBlock)
            })
            if (!selectBlock) return
            let targetPos = selectBlock.getPos().above()
            let dist = mob.position().distanceTo(targetPos)
            if (dist <= 2) {
                SpawnLootAtLocation(mob.level, targetPos, Utils.rollChestLoot(mob.getLootTable()).toArray())
                mob.persistentData.putInt('layLootTimer', level.time + 20 * 240)
            } else {
                NavigateWithDegrade(mob, targetPos, 1.0)
            }
        },
    )
}

/**
 * @param {Internal.BlockContainerJS} block 
 * @returns {boolean}
 */
function LayLootGoalIsLayableBlock(block) {
    const blockState = block.blockState
    if (blockState.is('minecraft:hopper') || blockState.is('create:brass_funnel') || blockState.is('create:andesite_funnel') || blockState.is('create:belt')) {
        return true
    }
    return false
}