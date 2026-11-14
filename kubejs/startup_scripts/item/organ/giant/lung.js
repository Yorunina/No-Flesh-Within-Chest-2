// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_lung')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_lung')
        .tag('kubejs:giant')
        .tag('kubejs:lung')
})
