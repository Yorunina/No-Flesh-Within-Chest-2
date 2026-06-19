// priority: 999
function NewPickItemBDNetGoal(entity) {
    return new $CustomGoal(
        'pick_item_bdnet',
        entity,
        /** @param {Internal.TamableAnimal} mob **/ mob => {
            if (!mob.owner || !mob.owner.isPlayer()) return false
            let dimNet = DimensionsNet.getPrimaryNetFromPlayer(mob.owner)
            if (!dimNet) return false
            return !dimNet.unifiedStorage.isFullSlotsSize()
        },
        /** @param {Internal.TamableAnimal} mob **/ mob => {
            if (!mob.owner || !mob.owner.isPlayer()) return false
            let dimNet = DimensionsNet.getPrimaryNetFromPlayer(mob.owner)
            if (!dimNet) return false
            return !dimNet.unifiedStorage.isFullSlotsSize()
        },
        true, // 是否允许中断
        /** @param {Internal.TamableAnimal} mob **/ mob => {
            // 开启时执行
        },
        /** @param {Internal.TamableAnimal} mob **/ mob => {
            // 停止时执行
        },
        false, // 是否每个tick都需要更新
        /** @param {Internal.TamableAnimal} mob **/ mob => {
            // tick
            if (mob.age % 20 != 0) return
            if (!mob.owner || !mob.owner.isPlayer()) return
            const level = mob.level
            const pos = mob.position()
            /** @type {Internal.ItemEntity} */
            let targetItemEntity = GetNearestEntityVec3d(level, pos, 16, (level, entity) => {
                if (entity instanceof $ItemEntity) return true 
            })
            if (!targetItemEntity) return
            let targetPos = targetItemEntity.position()
            if (mob.position().distanceTo(targetPos) <= 2) {
                let dimnet = DimensionsNet.getPrimaryNetFromPlayer(mob.owner)
                if (!dimnet) return
                let targetItem = targetItemEntity.getItem()
                let remainingCount = dimnet.unifiedStorage.insert(new $ItemStackKey(targetItem), targetItem.getCount(), false)
                    level.playSound(null, targetPos.x(), targetPos.y(), targetPos.z(), 'entity.item.pickup', mob.getSoundSource(), 1, 1)
                if (remainingCount.isEmpty()) {
                    targetItemEntity.discard()
                } else {
                    targetItemEntity.setItem(remainingCount.toStack())
                }
            } else {
                NavigateWithDegradeVec3d(mob, targetPos, 1.0)
            }
        },
    )
}