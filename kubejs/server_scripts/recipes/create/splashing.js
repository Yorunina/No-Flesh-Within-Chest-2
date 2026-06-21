// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.splashing([Item.of('minecraft:gunpowder').withChance(0.95), Item.of('create:zinc_nugget'), Item.of('minecraft:iron_nugget').withChance(0.5)], ['minecraft:gunpowder'])
})