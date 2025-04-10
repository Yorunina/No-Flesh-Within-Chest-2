// priority: 500
StartupEvents.registry('item', event => {
    // 灵笼
    event.create('kubejs:soul_cage')
        .maxStackSize(1)
        .maxDamage(100)
        .texture('kubejs:item/organs/relics/soul_cage')
})
