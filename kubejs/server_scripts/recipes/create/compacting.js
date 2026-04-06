// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.compacting('kubejs:flame_crystal', [Item.of('kubejs:flame_fragment', 9)])
    event.recipes.create.compacting(Fluid.of('kubejs:primal_nutrients_fluid', 50), [Item.of('biomancy:bloomberry'), Item.of('minecraft:redstone')])
})