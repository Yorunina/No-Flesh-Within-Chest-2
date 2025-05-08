// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:originiums').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/magic/originiums').tag('kubejs:magic')

    event.create('kubejs:gravity_sensor').maxStackSize(1).texture('kubejs:item/organs/magic/gravity_sensor').tag('kubejs:magic')

    event.create('kubejs:candy_heart').maxStackSize(1).texture('kubejs:item/organs/magic/candy_heart').tag('kubejs:magic').tag('kubejs:heart')
    event.create('kubejs:candy_pancreas').maxStackSize(1).texture('kubejs:item/organs/magic/candy_pancreas').tag('kubejs:magic')
    event.create('kubejs:candy_stomach').maxStackSize(1).texture('kubejs:item/organs/magic/candy_stomach').tag('kubejs:magic').tag('kubejs:stomach')
})