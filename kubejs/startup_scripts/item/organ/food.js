// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:king_of_stomach').maxStackSize(1).texture('kubejs:item/organs/food/king_of_stomach').tag('kubejs:stomach')

    event.create('kubejs:sweets_gland').food(food => {
        food.hunger(2).saturation(1)
        food.alwaysEdible()
    }).maxStackSize(1).texture('kubejs:item/organs/food/sweets_gland').tag('kubejs:food')

    event.create('kubejs:beer_gland').food(food => {
        food.hunger(2).saturation(1)
        food.alwaysEdible()
    }).maxStackSize(1).texture('kubejs:item/organs/food/beer_gland').tag('kubejs:food')

    event.create('kubejs:parasitism_stomach').maxStackSize(1).texture('kubejs:item/organs/food/parasitism_stomach').tag('kubejs:food')

    event.create('kubejs:greedy_throat').maxStackSize(1).texture('kubejs:item/organs/food/greedy_throat').tag('kubejs:food')

    event.create('kubejs:jar_of_mystery').maxStackSize(1).maxDamage(10).texture('kubejs:item/organs/food/jar_of_mystery').tag('kubejs:food')
    event.create('kubejs:parasite_larva').maxStackSize(1).maxDamage(100).texture('kubejs:item/organs/food/parasite_larva').tag('kubejs:food')

    event.create('kubejs:jar_of_vacuum').maxStackSize(1).texture('kubejs:item/organs/food/jar_of_vacuum').tag('kubejs:food')
})