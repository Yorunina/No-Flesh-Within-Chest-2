// priority: 1000
StartupEvents.registry('item', event => {
    event.create('kubejs:dried_taste_worm').maxStackSize(64).food(food => food.hunger(1).saturation(1).alwaysEdible()).texture('kubejs:item/food/dried_taste_worm')

    event.create('kubejs:fried_taste_worm').maxStackSize(64).food(food => food.hunger(2).saturation(1).alwaysEdible()).texture('kubejs:item/food/fried_taste_worm')

    event.create('kubejs:simple_cooked_taste_worm').maxStackSize(64).food(food => food.hunger(2).saturation(0.5).alwaysEdible()).texture('kubejs:item/food/simple_cooked_taste_worm')

    event.create('kubejs:taste_worm_powder').maxStackSize(64).food(food => food.hunger(1).saturation(1).alwaysEdible()).texture('kubejs:item/food/taste_worm_powder')

    event.create('kubejs:taste_worm_meat_filling').maxStackSize(64).food(food => food.hunger(1).saturation(1).alwaysEdible()).texture('kubejs:item/food/taste_worm_meat_filling')

    event.create('kubejs:taste_worm_meat_patty').maxStackSize(64).food(food => food.hunger(3).saturation(1).alwaysEdible()).texture('kubejs:item/food/taste_worm_meat_patty')


    event.create('kubejs:tasty_dough').maxStackSize(64).food(food => food.hunger(4).saturation(1).alwaysEdible()).texture('kubejs:item/food/tasty_dough')

    event.create('kubejs:tasty_bread').maxStackSize(64).food(food => food.hunger(8).saturation(0.5).alwaysEdible()).texture('kubejs:item/food/tasty_bread')

    event.create('kubejs:tasty_beer').maxStackSize(64).food(food => food.hunger(2).saturation(0.5).alwaysEdible()).texture('kubejs:item/food/tasty_beer')

    event.create('kubejs:tasty_worm_soup').maxStackSize(64).food(food => food.hunger(6).saturation(1.2).alwaysEdible()).texture('kubejs:item/food/tasty_worm_soup')

    event.create('kubejs:tasty_hamburg').maxStackSize(64).food(food => food.hunger(8).saturation(1.5).alwaysEdible()).texture('kubejs:item/food/tasty_hamburg')

    event.create('kubejs:human_meat_filling').texture('kubejs:item/food/human_meat_filling').food(food => food.hunger(3).saturation(0.5))
    event.create('kubejs:animal_meat_filling').texture('kubejs:item/food/animal_meat_filling').food(food => food.hunger(2).saturation(0.5))
    event.create('kubejs:insect_meat_filling').texture('kubejs:item/food/insect_meat_filling').food(food => food.hunger(2).saturation(0.5).effect('minecraft:nausea', 200, 0, 0.5))
    event.create('kubejs:nether_meat_filling').texture('kubejs:item/food/nether_meat_filling').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1))
    event.create('kubejs:dragon_meat_filling').texture('kubejs:item/food/dragon_meat_filling').food(food => food.hunger(3).saturation(1))

    event.create('kubejs:sausage_casing').texture('kubejs:item/food/sausage_casing').food(food => food.hunger(1).saturation(0.5))

    event.create('kubejs:human_meat_sausage').texture('kubejs:item/food/human_meat_sausage').food(food => food.hunger(6).saturation(1))
    event.create('kubejs:crispy_bone_human_meat_sausage').texture('kubejs:item/food/crispy_bone_human_meat_sausage').food(food => food.hunger(6).saturation(1.2))
    event.create('kubejs:animal_meat_sausage').texture('kubejs:item/food/animal_meat_sausage').food(food => food.hunger(4).saturation(1.2))
    event.create('kubejs:crispy_bone_animal_meat_sausage').texture('kubejs:item/food/crispy_bone_animal_meat_sausage').food(food => food.hunger(4).saturation(1.5))
    event.create('kubejs:insect_meat_sausage').texture('kubejs:item/food/insect_meat_sausage').food(food => food.hunger(4).saturation(1.2).effect('minecraft:regeneration', 600, 0, 1))
    event.create('kubejs:nether_meat_sausage').texture('kubejs:item/food/nether_meat_sausage').food(food => food.hunger(4).saturation(1.2).effect('minecraft:fire_resistance', 600, 0, 1))
    event.create('kubejs:dragon_meat_sausage').texture('kubejs:item/food/dragon_meat_sausage').food(food => food.hunger(6).saturation(1.5))
})