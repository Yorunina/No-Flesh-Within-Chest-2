// priority: 1000
StartupEvents.registry('minecraft:item', event => {
    event.create('kubejs:relics_incense', 'basic')
        .texture('kubejs:item/curios/relics_incense')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .tag('curios:incense')
})