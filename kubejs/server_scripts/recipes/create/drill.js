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


    event.recipes.createoreexcavation.drilling([Item.of('minecraft:bone'), Item.of('minecraft:bone').withChance(0.8), Item.of('minecraft:bone_block').withChance(0.3), Item.of('minecraft:bone_block', 64).withChance(0.01), Item.of('biomancy:primal_bone_block').withChance(0.05), Item.of('cataclysm:koboleton_bone').withChance(0.01)], 'kubejs:vein/ancient_remains', 320).id('kubejs:drill/ancient_remains')

    event.recipes.createoreexcavation.drilling([Item.of('kubejs:mantle_ore'), Item.of('create:scoria').withChance(0.8)], 'kubejs:vein/mantle_ore', 640).id('kubejs:drill/mantle_ore')
})