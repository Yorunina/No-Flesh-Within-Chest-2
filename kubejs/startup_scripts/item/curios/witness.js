// priority: 1000
StartupEvents.registry('minecraft:item', event => {
    event.create('kubejs:story_witness', 'basic')
        .texture('kubejs:item/curios/story_witness')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .tag('curios:witness')
})