// priority: 500
StartupEvents.registry('item', event => {

    event.create('kubejs:warden_core').maxStackSize(1).texture('kubejs:item/organs/relic/warden_core').tag('kubejs:relic')

    event.create('kubejs:ender_guardian_spine').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/relic/ender_guardian_spine').tag('kubejs:relic').tag('kubejs:ender').tag('kubejs:spine')
    event.create('kubejs:harbinger_lung').maxStackSize(1).texture('kubejs:item/organs/relic/harbinger_lung').tag('kubejs:relic').tag('kubejs:lung').tag('kubejs:machine')

    event.create('kubejs:scylla_star_gem').maxStackSize(1).tag('kubejs:relic').tag('kubejs:magic').texture('kubejs:item/organs/relic/scylla_star_gem').tag('kubejs:gem')
    event.create('kubejs:dying_heart').food(food => food.hunger(3).saturation(1)).maxStackSize(1).tag('kubejs:relic').tag('kubejs:magic').texture('kubejs:item/organs/relic/dying_heart')
    event.create('kubejs:wither_skull').maxStackSize(1).tag('kubejs:relic').texture('kubejs:item/organs/relic/wither_skull')
    event.create('kubejs:twinkle_rib').maxDamage(16).maxStackSize(1).tag('kubejs:relic').texture('kubejs:item/organs/relic/twinkle_rib').tag('kubejs:bone')

    // 炼狱巨龙
    event.create('kubejs:rough_infernal_dragon_skin').maxStackSize(1).texture('kubejs:item/organs/relic/rough_infernal_dragon_skin').tag('kubejs:relic').tag('kubejs:magic')
    event.create('kubejs:infernal_dragon_skin').maxStackSize(1).texture('kubejs:item/organs/relic/infernal_dragon_skin').tag('kubejs:relic').tag('kubejs:magic')
    // 焰魔
    event.create('kubejs:immortal_volcanic_rock').maxStackSize(1).texture('kubejs:item/organs/relic/immortal_volcanic_rock').tag('kubejs:relic').tag('kubejs:nether')
    event.create('kubejs:immortal_volcanic_crystal').maxStackSize(1).texture('kubejs:item/organs/relic/immortal_volcanic_crystal').tag('kubejs:relic').tag('kubejs:nether')
    // 下界合金巨兽
    event.create('kubejs:broken_netherite_muscle').maxStackSize(1).texture('kubejs:item/organs/relic/broken_netherite_muscle').tag('kubejs:relic').tag('kubejs:nether').tag('kubejs:muscle')
    event.create('kubejs:netherite_muscle').maxStackSize(1).texture('kubejs:item/organs/relic/netherite_muscle').tag('kubejs:relic').tag('kubejs:nether').tag('kubejs:muscle')
    // 咒翼
    event.create('kubejs:worn_maledictus_wing').maxStackSize(1).texture('kubejs:item/organs/relic/worn_maledictus_wing').tag('kubejs:relic').tag('kubejs:magic')
    event.create('kubejs:maledictus_wing').maxStackSize(1).texture('kubejs:item/organs/relic/maledictus_wing').tag('kubejs:relic').tag('kubejs:magic')
    // 利维亚桑
    event.create('kubejs:corroded_leviathan_rib').maxStackSize(1).texture('kubejs:item/organs/relic/corroded_leviathan_rib').tag('kubejs:relic').tag('kubejs:bone').tag('kubejs:magic')
    event.create('kubejs:leviathan_rib').maxStackSize(1).texture('kubejs:item/organs/relic/leviathan_rib').tag('kubejs:relic').tag('kubejs:bone').tag('kubejs:magic')
    // 远古遗骸
    event.create('kubejs:remnant_heart').maxStackSize(1).texture('kubejs:item/organs/relic/remnant_heart').tag('kubejs:heart').tag('kubejs:relic').tag('kubejs:magic')
    event.create('kubejs:ancient_heart').maxStackSize(1).texture('kubejs:item/organs/relic/ancient_heart').tag('kubejs:heart').tag('kubejs:relic').tag('kubejs:magic')
})