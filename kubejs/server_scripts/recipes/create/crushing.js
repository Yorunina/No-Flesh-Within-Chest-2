// priority: 1000
ServerEvents.recipes(event => {
    event.remove({id: 'create:crushing/blaze_rod'})
    event.recipes.create.crushing([Item.of('minecraft:blaze_powder', 3), Item.of('minecraft:blaze_powder', 3).withChance(0.5)], Item.of('minecraft:blaze_rod'))
})