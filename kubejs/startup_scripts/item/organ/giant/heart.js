// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_heart')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_heart')
        .tag('kubejs:giant_organ')
        .tag('kubejs:heart')
})
