// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_muscle')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_muscle')
        .tag('kubejs:giant_organ')
        .tag('kubejs:muscle')
})
