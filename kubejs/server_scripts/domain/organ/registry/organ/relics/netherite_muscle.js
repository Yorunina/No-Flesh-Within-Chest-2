// priority: 500
RegistryOrgan('kubejs:netherite_muscle')
    .addScore('kubejs:extreme_strength', 2.5)
    .addScore('chestcavity:digestion', -0.5)
    .addScore('chestcavity:nutrition', -0.5)
    .setCanSpawn(true)


// todo 迁到其他位置
ServerEvents.recipes(event => {
    event.recipes.create.crushing([Item.of('minecraft:netherite_scrap'), Item.of('minecraft:netherite_scrap').withChance(0.7), Item.of('minecraft:netherite_scrap').withChance(0.3)], 'kubejs:netherite_muscle').processingTime(400)
})