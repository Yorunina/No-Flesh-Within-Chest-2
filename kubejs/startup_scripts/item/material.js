// priority: 1000
StartupEvents.registry('item', event => {
    event.create('sawdust').texture('kubejs:item/material/sawdust').maxStackSize(64).burnTime(400)

    event.create('kubejs:dried_taste_worm').maxStackSize(1).food(food => food.hunger(1).saturation(1)).texture('kubejs:item/food/dried_taste_worm')

    event.create('kubejs:fried_taste_worm').maxStackSize(1).food(food => food.hunger(2).saturation(1)).texture('kubejs:item/food/fried_taste_worm')

    event.create('kubejs:simple_cooked_taste_worm').maxStackSize(1).food(food => food.hunger(2).saturation(0.5)).texture('kubejs:item/food/simple_cooked_taste_worm')

    event.create('kubejs:taste_worm_powder').maxStackSize(1).food(food => food.hunger(1).saturation(1)).texture('kubejs:item/food/taste_worm_powder')

    event.create('kubejs:taste_worm_meat_filling').maxStackSize(1).food(food => food.hunger(1).saturation(1)).texture('kubejs:item/food/taste_worm_meat_filling')

    event.create('kubejs:taste_worm_meat_patty').maxStackSize(1).food(food => food.hunger(3).saturation(1)).texture('kubejs:item/food/taste_worm_meat_patty')

    event.create('kubejs:fried_taste_worm_meat_patty').maxStackSize(1).food(food => food.hunger(6).saturation(2).effect('minecraft:fire_resistance', 1200, 0, 1)).texture('kubejs:item/food/fried_taste_worm_meat_patty')

    event.create('kubejs:tasty_dough').maxStackSize(1).food(food => food.hunger(4).saturation(1)).texture('kubejs:item/food/tasty_dough')

    event.create('kubejs:tasty_bread').maxStackSize(1).food(food => food.hunger(8).saturation(0.5)).texture('kubejs:item/food/tasty_bread')

    event.create('kubejs:tasty_beer').maxStackSize(1).food(food => food.hunger(2).saturation(0.5)).texture('kubejs:item/food/tasty_beer')

    event.create('kubejs:tasty_worm_soup').maxStackSize(1).food(food => food.hunger(6).saturation(1.5)).texture('kubejs:item/food/tasty_worm_soup')

    event.create('kubejs:tasty_hamburg').maxStackSize(1).food(food => food.hunger(8).saturation(2)).texture('kubejs:item/food/tasty_hamburg')
})