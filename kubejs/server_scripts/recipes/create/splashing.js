// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.splashing([Item.of('minecraft:gunpowder').withChance(0.9), Item.of('create:zinc_nugget').withChance(0.8), Item.of('minecraft:iron_nugget').withChance(0.5)], ['minecraft:gunpowder'])
})