// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_liver')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_liver')
        .tag('kubejs:giant')
        .tag('kubejs:liver')
})
