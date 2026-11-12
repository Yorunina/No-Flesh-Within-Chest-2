// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_spleen')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_spleen')
        .tag('kubejs:giant_organ')
        .tag('kubejs:spleen')
})
