// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.createoreexcavation.vein(Text.translate('vein.kubejs.ancient_remains'), 'minecraft:bone')
        .placement(128, 32, 927845858)
        .veinSize(6, 12)
        .biomeWhitelist('minecraft:is_overworld')
        .id('kubejs:vein/ancient_remains')


    event.recipes.createoreexcavation.vein(Text.translate('vein.kubejs.mantle_ore'), 'kubejs:mantle_ore')
        .placement(128, 32, 282605645)
        .veinSize(4, 16)
        .biomeWhitelist('minecraft:is_overworld')
        .id('kubejs:vein/mantle_ore')


    event.recipes.createoreexcavation.drilling([Item.of('minecraft:bone'), Item.of('minecraft:bone').withChance(0.8), Item.of('minecraft:bone_block').withChance(0.3), Item.of('minecraft:bone_block', 64).withChance(0.01), Item.of('biomancy:primal_bone_block').withChance(0.05), Item.of('cataclysm:koboleton_bone').withChance(0.01), Item.of('tconstruct:necrotic_bone').withChance(0.01)], 'kubejs:vein/ancient_remains', 320).id('kubejs:drill/ancient_remains')

    event.recipes.createoreexcavation.drilling([Item.of('kubejs:mantle_ore'), Item.of('create:scoria').withChance(0.8)], 'kubejs:vein/mantle_ore', 640).id('kubejs:drill/mantle_ore')

    // // 1. 矿脉生成
    // // 生成矿脉（名称： 粗锇矿 ，贴图： mekanism:raw_osmium），生成规则（平均间隔128区块，最小间距8区块，随机数），id（kubejs:mek_osmium）；该 id 在配置矿脉开采时需要，也在 /coe 命令中作为 <recipe> 使用

    // event.recipes.createoreexcavation.vein('{"text": "粗锇矿"}', 'mekanism:raw_osmium')
    //     .placement(128, 8, 64825185)
    //     .id("kubejs:mek_osmium")

    //     // 以上是生成矿脉最少需要的配置项，生成矿脉还包含以下可选项

    //     .priority(0)                                                    // 多个矿物都命中同一个区块时，采用数值高的矿脉
    //     .alwaysFinite()                                              // 矿脉不是无限开采的，不添加默认为 .alwaysInfinite() 可无限开采
    //     .veinSize(3, 8.5)                                            // 矿脉大小区间，3000-8500； 当矿脉不是无限开采时生效
    //     .biomeWhitelist('minecraft:is_overworld')          // 可生成的群系白名单；黑名单使用 .biomeBlacklist()*

    // // 2. 矿脉开采
    // // 生成矿脉后，需要配置如何开采
    // // 产出单种物品
    // // 矿物配置（产出：mekanism:raw_osmium，在 kubejs:mek_osmium 矿脉中，32 RPM 下每采集一次需要 600 tick），id（kubejs:mek_vein1）
    // event.recipes.createoreexcavation.drilling('mekanism:raw_osmium', 'kubejs:mek_osmium', 600).id("kubejs:mek_vein1")

    // // 产出多种物品，且有几率几率
    // // 矿物配置（产出：mekanism:raw_osmium 和 5%几率 minecraft:diamond，在 kubejs:mek_osmium 矿脉中，32RPM下每采集一次需要 600 tick），id（kubejs:mek_vein1）
    // event.recipes.createoreexcavation.drilling(['mekanism:raw_osmium', Item.of('minecraft:diamond').withChance(0.05)], 'kubejs:mek_osmium', 600).id("kubejs:mek_vein1")

    // // 产出流体
    // // 流体配置（产出：minecraft:lava 2000ml 从 kubejs:lava 矿脉中，32 RPM 下每采集一次需要 100 tick）；流体只能产出一种，不配置量默认为 1000ml
    // event.recipes.createoreexcavation.extracting('minecraft:lava 2000', 'kubejs:lava', 100).id("kubejs:my_lava_vein")
    //     // 矿物和流体都通用的可选配置
    //     .fluid('minecraft:lava 10')                                   // 需要流体 minecraft:lava，每次 10ml，不配置为 1000ml
    //     .drill('createoreexcavation:diamond_drill')           // 需要钻头 钻石以上 （下界合金钻头为 createoreexcavation:netherite_drill）
    //     .stress(512)
})