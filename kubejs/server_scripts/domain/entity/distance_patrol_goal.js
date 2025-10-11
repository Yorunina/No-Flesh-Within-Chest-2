// priority: 999
/**
 * 
 * @param {Internal.PathfinderMob} entity 
 */
function LongDistancePatrolGoal(entity) {
    entity.goalSelector.addGoal(10, new $CustomGoal(
        'long_distance_patrol',
        entity,
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 何时能够使用
            if (mob.persistentData.contains('patrolTarget') &&
                mob.persistentData.get('patrolTarget').getInt('patrolling') == 1) {
                return true
            }
            return false
        },
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 能否继续使用 
            let target = mob.persistentData.get('patrolTarget')
            let blockPos = new Vec3d(target.getFloat('x'), target.getFloat('y'), target.getFloat('z'))
            if (mob.getPosition(1.0).distanceTo(blockPos) <= 16) {
                return false
            }
            return true
        },
        true, // 是否允许中断
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 开启时执行
            let target = mob.persistentData.get('patrolTarget')
            mob.getNavigation().moveTo(target.getFloat('x'), target.getFloat('y'), target.getFloat('z'), 1.0)
        },
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // 停止时执行
            let target = mob.persistentData.get('patrolTarget')
            target.putInt('patrolling', 0)
        },
        false, // 是否每个tick都需要更新
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            // tick
            let target = mob.persistentData.get('patrolTarget')
            mob.getNavigation().moveTo(target.getFloat('x'), target.getFloat('y'), target.getFloat('z'), 1.0)
        },
    ))
}