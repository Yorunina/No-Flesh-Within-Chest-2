// priority: 1000
// 血清诱导分化
StartupEvents.registry('mob_effect', event => {
    event.create('differentiation_induction')
        .harmful()
        .removeEffect((entity, attributeMap, lvl) => {
            const level = entity.level
            if (level.isClientSide()) return
            if (entity instanceof $FleshBlob) {
                let targetEntityType = entity.persistentData.getString('inducerEntityType')
                if (!targetEntityType) return
                let targetEntity = level.createEntity(targetEntityType)
                targetEntity.setPos(entity.getPosition(1.0))
                targetEntity.finalizeSpawn(level, level.getCurrentDifficultyAt(entity.getPosition(1.0)), 'mob_summoned', null, null)
                level.addFreshEntityWithPassengers(targetEntity)
                entity.discard()
                return true
            }
            if (entity.isPlayer()) {
                if (level.dimension != 'compactmachines:compact_world') {
                    let chestCavity = entity.getChestCavityInstance()
                    chestCavity.setInventoryType('kubejs:cc_inventory_types/transdimensional_mechanized')
                    return true
                }
            }
            return true
        })
        .color(Color.GREEN)
})