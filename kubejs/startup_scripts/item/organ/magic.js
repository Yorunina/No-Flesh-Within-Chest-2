// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:originiums').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/magic/originiums').tag('kubejs:magic')

    event.create('kubejs:gravity_sensor').maxStackSize(1).texture('kubejs:item/organs/magic/gravity_sensor').tag('kubejs:magic')

    event.create('kubejs:candy_heart').maxStackSize(1).texture('kubejs:item/organs/magic/candy_heart').tag('kubejs:magic').tag('kubejs:heart')
    event.create('kubejs:candy_pancreas').maxStackSize(1).texture('kubejs:item/organs/magic/candy_pancreas').tag('kubejs:magic')
    event.create('kubejs:candy_stomach').maxStackSize(1).texture('kubejs:item/organs/magic/candy_stomach').tag('kubejs:magic').tag('kubejs:stomach')


    event.create('kubejs:harvest_rune_bone').maxStackSize(1).texture('kubejs:item/organs/magic/harvest_rune_bone').tag('kubejs:magic').tag('kubejs:bone')
    event.create('kubejs:shrink_rune_bone').maxStackSize(1).texture('kubejs:item/organs/magic/shrink_rune_bone').tag('kubejs:magic').tag('kubejs:bone')
    
    // 灵笼
    event.create('kubejs:soul_cage')
        .maxStackSize(1)
        .maxDamage(50)
        .texture('kubejs:item/organs/magic/soul_cage')
        .tag('kubejs:magic')

    // 灵翼
    event.create('kubejs:soul_wing')
        .maxStackSize(1)
        .tag('kubejs:magic')
        .texture('kubejs:item/organs/magic/soul_wing')
})