// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:king_of_stomach').maxStackSize(1).texture('kubejs:item/organs/food/king_of_stomach').tag('kubejs:stomach')

    event.create('kubejs:sweets_gland').food(food => food.hunger(2).saturation(1).alwaysEdible()).maxStackSize(1).texture('kubejs:item/organs/food/sweets_gland').tag('kubejs:food')

    event.create('kubejs:beer_gland').food(food => food.hunger(2).saturation(1).alwaysEdible()).maxStackSize(1).texture('kubejs:item/organs/food/beer_gland').tag('kubejs:food')

    event.create('kubejs:parasitism_stomach').maxStackSize(1).texture('kubejs:item/organs/food/parasitism_stomach').tag('kubejs:food')

    event.create('kubejs:greedy_throat').maxStackSize(1).texture('kubejs:item/organs/food/greedy_throat').tag('kubejs:food')

    event.create('kubejs:worm_larva').maxStackSize(1).maxDamage(100).texture('kubejs:item/organs/food/worm_larva').tag('kubejs:food').tag('chestcavity:cannot_remove')

    event.create('kubejs:jar_of_vacuum').maxStackSize(1).texture('kubejs:item/organs/food/jar_of_vacuum')

    event.create('kubejs:jar_of_mystery').maxStackSize(1).maxDamage(10).texture('kubejs:item/organs/food/jar_of_mystery')

    event.create('kubejs:worm_of_taste').maxStackSize(1).food(food => food.hunger(1).saturation(1).effect('minecraft:nausea', 200, 0, 1)).texture('kubejs:item/organs/food/worm_of_taste').tag('kubejs:food').tag('kubejs:infected')

    event.create('kubejs:worm_of_gula').maxStackSize(1).food(food => food.hunger(8).saturation(1.5)).texture('kubejs:item/organs/food/worm_of_gula').tag('kubejs:food').tag('kubejs:infected').tag('chestcavity:cannot_remove')

    event.create('kubejs:gula_beacon').maxStackSize(1).food(food => food.hunger(1).saturation(1)).texture('kubejs:item/organs/food/gula_beacon').tag('kubejs:food').tag('kubejs:infected').tag('chestcavity:cannot_remove')

    event.create('kubejs:gula_worm_nest').maxStackSize(1).food(food => food.hunger(4).saturation(0.5)).texture('kubejs:item/organs/food/gula_worm_nest').tag('kubejs:food').tag('kubejs:infected').tag('chestcavity:cannot_remove')

    event.create('kubejs:deserted_gula_worm_nest').maxStackSize(1).food(food => food.hunger(1).saturation(0.5)).texture('kubejs:item/organs/food/deserted_gula_worm_nest').tag('kubejs:food').tag('kubejs:infected')

    event.create('kubejs:sweet_heart').maxStackSize(1).food(food => food.hunger(2).saturation(4)).texture('kubejs:item/organs/food/sweet_heart').tag('kubejs:food').tag('kubejs:heart')

    event.create('kubejs:baguette_bone').maxStackSize(1).food(food => food.hunger(4).saturation(1)).texture('kubejs:item/organs/food/baguette_bone').tag('kubejs:food').tag('kubejs:bone')

    event.create('kubejs:gluten_muscle').maxStackSize(1).food(food => food.hunger(10).saturation(0.1)).texture('kubejs:item/organs/food/gluten_muscle').tag('kubejs:food').tag('kubejs:muscle')

    event.create('kubejs:living_beef_wellington').maxStackSize(1).food(food => food.hunger(8).saturation(0.5)).texture('kubejs:item/organs/food/living_beef_wellington').tag('kubejs:food').tag('kubejs:muscle')

    event.create('kubejs:mashed_potato_pancreas').maxStackSize(1).food(food => food.hunger(4).saturation(1)).texture('kubejs:item/organs/food/mashed_potato_pancreas').tag('kubejs:food').tag('kubejs:pancreas')

    event.create('kubejs:tasty_gland').maxStackSize(1).food(food => food.hunger(3).saturation(1)).texture('kubejs:item/organs/food/tasty_gland').tag('kubejs:food')

    event.create('kubejs:void_stomach_pouch').maxStackSize(1).texture('kubejs:item/organs/food/void_stomach_pouch').maxDamage(60).tag('kubejs:food').tag('kubejs:stomach').tag('chestcavity:cannot_remove')
})
