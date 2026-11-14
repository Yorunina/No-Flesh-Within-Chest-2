// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_spine')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_spine')
        .tag('kubejs:giant')
        .tag('kubejs:spine')
})
