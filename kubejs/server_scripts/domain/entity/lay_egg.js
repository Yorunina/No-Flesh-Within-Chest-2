// priority: 999
function NewLayEggGoal(entity) {
    return new $CustomGoal(
        'lay_egg',
        entity,
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 何时能够使用
            return mob.persistentData.getInt('layEggTimer') <= mob.age
        },
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 能否继续使用 
            return mob.persistentData.getInt('layEggTimer') <= mob.age
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
            let selectBlock = FindNearestBlock(mob, 6, 2, 0, (curBlock) => {
                if (curBlock.blockState.is('minecraft:hopper')) {
                    return true
                }
            })
            if (!selectBlock) return
            let curPos = mob.blockPosition()
            let targetPos = selectBlock.getPos().above()
            let dist = curPos.distSqr(targetPos)
            if (dist <= 1) {
                SpawnLootAtLocation(mob.level, targetPos, Utils.rollChestLoot(mob.getLootTable()).toArray())
                mob.persistentData.putInt('layEggTimer', mob.age + 20 * 10)
            } else {
                mob.navigation.moveTo(targetPos.x, targetPos.y, targetPos.z, 1)
            }
        },
    )
}