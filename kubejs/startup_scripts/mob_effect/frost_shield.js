// priority: 1000
const FrostShieldArmorUpUUID = UUID.fromString('3017C996-85DE-46E8-9758-ECFD799F391B')
const FrostShieldArmorUpIdentifier = 'FrostShieldArmorUp'
StartupEvents.registry('mob_effect', event => {
    event.create('frost_shield')
        .beneficial()
        .addEffect((entity, attributeMap, lvl) => {
            let armorAttribute = attributeMap.getInstance('minecraft:generic.armor')
            if (!armorAttribute) return
            armorAttribute.addPermanentModifier(
                new $AttributeModifier(
                    FrostShieldArmorUpUUID,
                    FrostShieldArmorUpIdentifier,
                    (lvl + 1) * 200,
                    $Operation.ADDITION)
            )
        })
        .effectTick((entity, lvl) => {
            if (entity.age % 20 != 0) return
            if (entity.isOnFire()) {
                let pEffect = entity.getEffect('kubejs:frost_shield')
                entity.removeEffect('kubejs:frost_shield')
                entity.setRemainingFireTicks(0)
                if (lvl >= 1) {
                    entity.potionEffects.add('kubejs:frost_shield', pEffect.getDuration(), lvl - 1, pEffect.isAmbient(), pEffect.isVisible())
                }
            }
        })
        .removeEffect((entity, attributeMap, lvl) => {
            let armorAttribute = attributeMap.getInstance('minecraft:generic.armor')
            if (!armorAttribute) return
            armorAttribute.removePermanentModifier(FrostShieldArmorUpUUID)
        })
        .color(Color.DARK_AQUA)
})
