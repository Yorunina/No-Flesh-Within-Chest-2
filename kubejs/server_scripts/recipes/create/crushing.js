// priority: 1000
ServerEvents.recipes(event => {
    event.remove({ id: 'create:crushing/blaze_rod' })
    event.recipes.create.crushing([Item.of('minecraft:blaze_powder', 3), Item.of('minecraft:blaze_powder', 3).withChance(0.5)], Item.of('minecraft:blaze_rod'))

    event.recipes.create.crushing([Item.of('minecraft:blaze_powder', 3), Item.of('minecraft:blaze_powder', 3).withChance(0.5)], Item.of('kubejs:blaze_rod'))

    event.recipes.create.crushing([Item.of('minecraft:netherite_scrap'), Item.of('minecraft:netherite_scrap').withChance(0.7), Item.of('minecraft:netherite_scrap').withChance(0.3)], 'kubejs:netherite_muscle').processingTime(400)
})