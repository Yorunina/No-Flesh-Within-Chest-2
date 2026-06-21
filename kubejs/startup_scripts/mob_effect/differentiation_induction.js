// priority: 1000
// 血清诱导分化
StartupEvents.registry('mob_effect', event => {
    event.create('differentiation_induction')
        .harmful()
        .removeEffect((entity, attributeMap, lvl) => {
            if (entity instanceof $FleshBlob) {
                let targetEntityType = entity.persistentData.getString('inducerEntityType')
                if (!targetEntityType) return
                let level = entity.level
                let targetEntity = level.createEntity(targetEntityType)
                targetEntity.setPos(entity.getPosition(1.0))
                level.addFreshEntity(targetEntity)
                entity.discard()
            }
            return true
        })
        .color(Color.GREEN)
})