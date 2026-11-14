// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_kidney')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_kidney')
        .tag('kubejs:giant')
        .tag('kubejs:kidney')
})
