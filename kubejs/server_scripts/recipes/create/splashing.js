// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.splashing([Item.of('minecraft:gunpowder').withChance(0.95), Item.of('create:zinc_nugget'), Item.of('minecraft:iron_nugget').withChance(0.5)], ['minecraft:gunpowder'])

    // 颜色淡化
    event.recipes.create.splashing([Item.of('minecraft:gray_dye')], ['minecraft:black_dye'])
    event.recipes.create.splashing([Item.of('minecraft:light_gray_dye')], ['minecraft:gray_dye'])
    event.recipes.create.splashing([Item.of('minecraft:white_dye')], ['minecraft:light_gray_dye'])

    event.recipes.create.splashing([Item.of('minecraft:magenta_dye')], ['minecraft:purple_dye'])
    event.recipes.create.splashing([Item.of('minecraft:pink_dye')], ['minecraft:magenta_dye'])
    event.recipes.create.splashing([Item.of('minecraft:white_dye')], ['minecraft:pink_dye'])

    event.recipes.create.splashing([Item.of('minecraft:cyan_dye')], ['minecraft:blue_dye'])
    event.recipes.create.splashing([Item.of('minecraft:light_blue_dye')], ['minecraft:cyan_dye'])
    event.recipes.create.splashing([Item.of('minecraft:white_dye')], ['minecraft:light_blue_dye'])
    // 颜色碳化
    event.blasting(Item.of('minecraft:black_dye'), Item.of('minecraft:white_dye'), '0.1')
})
