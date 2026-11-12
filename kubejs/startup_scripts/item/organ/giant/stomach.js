// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_stomach')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_stomach')
        .tag('kubejs:giant_organ')
        .tag('kubejs:stomach')
})
