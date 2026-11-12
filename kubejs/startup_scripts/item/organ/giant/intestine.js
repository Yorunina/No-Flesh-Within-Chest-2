// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:giant_intestine')
        .maxStackSize(1)
        .texture('kubejs:item/organs/giant/giant_intestine')
        .tag('kubejs:giant_organ')
        .tag('kubejs:intestine')
})
