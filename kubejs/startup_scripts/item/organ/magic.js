// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:originiums').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/magic/originiums').tag('kubejs:magic')

    // 糖果
    event.create('kubejs:candy_heart').maxStackSize(1).texture('kubejs:item/organs/magic/candy_heart').tag('kubejs:magic').tag('kubejs:heart')
    event.create('kubejs:candy_pancreas').maxStackSize(1).texture('kubejs:item/organs/magic/candy_pancreas').tag('kubejs:magic')
    event.create('kubejs:candy_stomach').maxStackSize(1).texture('kubejs:item/organs/magic/candy_stomach').tag('kubejs:magic').tag('kubejs:stomach')

    // 符文宝石
    event.create('kubejs:harvest_star_gem').maxStackSize(1).texture('kubejs:item/organs/magic/harvest_star_gem').tag('kubejs:magic').tag('kubejs:gem')
    // 星宝石
    event.create('kubejs:heal_star_gem').maxStackSize(1).texture('kubejs:item/organs/magic/heal_star_gem').tag('kubejs:magic').tag('kubejs:gem')
    // 灵笼
    event.create('kubejs:soul_cage').maxStackSize(1).maxDamage(50).texture('kubejs:item/organs/magic/soul_cage').tag('kubejs:magic')
    // 灵翼
    event.create('kubejs:soul_wing').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/soul_wing')
    event.create('kubejs:coral_armor').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/coral_armor')
    event.create('kubejs:deepling_star_gem').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/deepling_star_gem').tag('kubejs:gem')
})