// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_appendix')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_appendix')
        .tag('kubejs:giant')
        .tag('kubejs:appendix')
})
