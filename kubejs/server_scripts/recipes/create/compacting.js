// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.compacting('kubejs:flame_crystal', [Item.of('kubejs:flame_fragment', 9)])
})