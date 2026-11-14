// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_rib')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_rib')
        .tag('kubejs:giant')
        .tag('kubejs:bone')
})
