// priority: 1000
ServerEvents.recipes(event => {
    event.remove({ id: 'create:crushing/blaze_rod' })
    event.recipes.create.crushing([Item.of('minecraft:blaze_powder', 3), Item.of('minecraft:blaze_powder', 3).withChance(0.5)], Item.of('minecraft:blaze_rod'))

    event.recipes.create.crushing([Item.of('minecraft:netherite_scrap'), Item.of('minecraft:netherite_scrap').withChance(0.7), Item.of('minecraft:netherite_scrap').withChance(0.3)], 'kubejs:broken_netherite_muscle').processingTime(400)
    event.recipes.create.crushing([Item.of('minecraft:netherite_scrap'), Item.of('minecraft:netherite_scrap').withChance(0.7), Item.of('minecraft:netherite_scrap').withChance(0.3)], 'kubejs:netherite_muscle').processingTime(400)

    event.recipes.create.crushing([Item.of('minecraft:bone_meal'), Item.of('minecraft:bone_meal').withChance(0.7)], Ingredient.of('#kubejs:bone')).processingTime(400)
    event.recipes.create.crushing([Item.of('minecraft:bone_meal', 2), Item.of('minecraft:bone_meal').withChance(0.7)], Ingredient.of('#kubejs:spine')).processingTime(400)
    event.recipes.create.crushing([Item.of('minecraft:red_dye').withChance(0.5), Item.of('minecraft:orange_dye').withChance(0.5), Item.of('minecraft:yellow_dye').withChance(0.5), Item.of('minecraft:green_dye').withChance(0.5), Item.of('minecraft:cyan_dye').withChance(0.5), Item.of('minecraft:blue_dye').withChance(0.5), Item.of('minecraft:purple_dye').withChance(0.5)], Item.of('kubejs:rainbow_compound')).processingTime(400)
})