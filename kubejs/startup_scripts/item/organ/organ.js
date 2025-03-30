// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:prismarine_crown').maxStackSize(1).texture('kubejs:item/organs/legends/prismarine_crown').tag('kubejs:legends')

    event.create('kubejs:sea_bunny_skin').maxStackSize(1).texture('kubejs:item/organs/nature/sea_bunny_skin')
})
