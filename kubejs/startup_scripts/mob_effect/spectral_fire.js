// priority: 1000
const SpectralFireArmorDownUUID = UUID.fromString('46E22AA7-C6B7-46FF-8282-1ACF1238E1B2')
const SpectralFireArmorDownIdentifier = 'SpectralFireArmorDown'
StartupEvents.registry('mob_effect', event => {
    event.create('spectral_fire')
        .harmful()
        .addEffect((entity, attributeMap, lvl) => {
            let armorAttribute = attributeMap.getInstance('minecraft:generic.armor')
            if (!armorAttribute) return
            armorAttribute.addPermanentModifier(
                new $AttributeModifier(
                    SpectralFireArmorDownUUID,
                    SpectralFireArmorDownIdentifier,
                    -1,
                    'multiply_total')
            )
        })
        .removeEffect((entity, attributeMap, lvl) => {
            let armorAttribute = attributeMap.getInstance('minecraft:generic.armor')
            if (!armorAttribute) return
            armorAttribute.removePermanentModifier(SpectralFireArmorDownUUID)
        })
        .color(Color.DARK_RED)
})
