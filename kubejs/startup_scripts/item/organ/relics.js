// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:warden_core').maxStackSize(1).texture('kubejs:item/organs/relics/warden_core').tag('kubejs:relics')

    event.create('kubejs:ender_guardian_spine').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/relics/ender_guardian_spine').tag('kubejs:relics').tag('kubejs:ender').tag('kubejs:spine')

    event.create('kubejs:dying_heart').food(food => food.hunger(3).saturation(1)).maxStackSize(1).tag('kubejs:relics').tag('kubejs:magic').texture('kubejs:item/organs/relics/dying_heart')
    event.create('kubejs:wither_skull').maxStackSize(1).tag('kubejs:relics').texture('kubejs:item/organs/relics/wither_skull')
    event.create('kubejs:twinkle_rib').maxDamage(16).maxStackSize(1).tag('kubejs:relics').texture('kubejs:item/organs/relics/twinkle_rib').tag('kubejs:bone')

    // 炼狱巨龙
    event.create('kubejs:decayed_infernal_dragon_crystal').maxStackSize(1).texture('kubejs:item/organs/relics/decayed_infernal_dragon_crystal').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:infernal_dragon_crystal').maxStackSize(1).texture('kubejs:item/organs/relics/infernal_dragon_crystal').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:ancient_infernal_dragon_crystal').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_infernal_dragon_crystal').tag('kubejs:relics').tag('kubejs:magic')
    // 焰魔
    event.create('kubejs:immortal_volcanic_rock').maxStackSize(1).texture('kubejs:item/organs/relics/immortal_volcanic_rock').tag('kubejs:relics').tag('kubejs:nether')
    event.create('kubejs:immortal_volcanic_crystal').maxStackSize(1).texture('kubejs:item/organs/relics/immortal_volcanic_crystal').tag('kubejs:relics').tag('kubejs:nether')
    event.create('kubejs:ancient_immortal_volcanic_crystal').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_immortal_volcanic_crystal').tag('kubejs:relics').tag('kubejs:nether')
    // 下界合金巨兽
    event.create('kubejs:broken_netherite_muscle').maxStackSize(1).texture('kubejs:item/organs/relics/broken_netherite_muscle').tag('kubejs:relics').tag('kubejs:nether').tag('kubejs:muscle')
    event.create('kubejs:netherite_muscle').maxStackSize(1).texture('kubejs:item/organs/relics/netherite_muscle').tag('kubejs:relics').tag('kubejs:nether').tag('kubejs:muscle')
    event.create('kubejs:ancient_netherite_muscle').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_netherite_muscle').tag('kubejs:relics').tag('kubejs:nether').tag('kubejs:muscle')
    // 咒翼
    event.create('kubejs:worn_maledictus_wing').maxStackSize(1).texture('kubejs:item/organs/relics/worn_maledictus_wing').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:maledictus_wing').maxStackSize(1).texture('kubejs:item/organs/relics/maledictus_wing').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:ancient_maledictus_wing').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_maledictus_wing').tag('kubejs:relics').tag('kubejs:magic')
    // 利维亚桑
    event.create('kubejs:corroded_leviathan_rib').maxStackSize(1).texture('kubejs:item/organs/relics/corroded_leviathan_rib').tag('kubejs:relics').tag('kubejs:bone').tag('kubejs:magic')
    event.create('kubejs:leviathan_rib').maxStackSize(1).texture('kubejs:item/organs/relics/leviathan_rib').tag('kubejs:relics').tag('kubejs:bone').tag('kubejs:magic')
    event.create('kubejs:ancient_leviathan_rib').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_leviathan_rib').tag('kubejs:relics').tag('kubejs:bone').tag('kubejs:magic')
    // 远古遗骸
    event.create('kubejs:remnant_heart').maxStackSize(1).texture('kubejs:item/organs/relics/remnant_heart').tag('kubejs:heart').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:awaken_heart').maxStackSize(1).texture('kubejs:item/organs/relics/awaken_heart').tag('kubejs:heart').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:ancient_heart').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_heart').tag('kubejs:heart').tag('kubejs:relics').tag('kubejs:magic')
    // 沙虫
    event.create('kubejs:abnormal_sand_gland').maxStackSize(1).texture('kubejs:item/organs/relics/abnormal_sand_gland').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:poison_sand_gland').maxStackSize(1).texture('kubejs:item/organs/relics/poison_sand_gland').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:ancient_poison_sand_gland').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_poison_sand_gland').tag('kubejs:relics').tag('kubejs:magic')
    // 先驱者
    event.create('kubejs:harbinger_lung').maxStackSize(1).texture('kubejs:item/organs/relics/harbinger_lung').tag('kubejs:relics').tag('kubejs:lung').tag('kubejs:machine')
    event.create('kubejs:sturdy_harbinger_lung').maxStackSize(1).texture('kubejs:item/organs/relics/sturdy_harbinger_lung').tag('kubejs:relics').tag('kubejs:lung').tag('kubejs:machine')
    event.create('kubejs:ancient_harbinger_lung').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_harbinger_lung').tag('kubejs:relics').tag('kubejs:lung').tag('kubejs:machine')
    // 斯库拉
    event.create('kubejs:cold_armor_plate').maxStackSize(1).texture('kubejs:item/organs/relics/cold_armor_plate').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:shining_cold_armor_plate').maxStackSize(1).texture('kubejs:item/organs/relics/shining_cold_armor_plate').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:ancient_cold_armor_plate').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_cold_armor_plate').tag('kubejs:relics').tag('kubejs:magic')
    // 雪怪
    event.create('kubejs:cold_crystal').maxStackSize(1).texture('kubejs:item/organs/relics/cold_crystal').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:eternal_cold_crystal').maxStackSize(1).texture('kubejs:item/organs/relics/eternal_cold_crystal').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:ancient_eternal_cold_crystal').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_eternal_cold_crystal').tag('kubejs:relics').tag('kubejs:magic')
    // 冥界骑士
    event.create('kubejs:underworld_knight_debris').maxStackSize(1).texture('kubejs:item/organs/relics/underworld_knight_debris').tag('kubejs:relics').tag('kubejs:magic').tag('kubejs:bone')
    event.create('kubejs:underworld_knight_bone').maxStackSize(1).texture('kubejs:item/organs/relics/underworld_knight_bone').tag('kubejs:relics').tag('kubejs:magic').tag('kubejs:bone')
    event.create('kubejs:ancient_underworld_knight_bone').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_underworld_knight_bone').tag('kubejs:relics').tag('kubejs:magic').tag('kubejs:bone')
    // 克拉肯
    event.create('kubejs:kraken_cloudy_eye').maxStackSize(1).texture('kubejs:item/organs/relics/kraken_cloudy_eye').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:kraken_eye').maxStackSize(1).texture('kubejs:item/organs/relics/kraken_eye').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:ancient_kraken_eye').maxStackSize(1).texture('kubejs:item/organs/relics/ancient_kraken_eye').tag('kubejs:relics').tag('kubejs:magic')
})