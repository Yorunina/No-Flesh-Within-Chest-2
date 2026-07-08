// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.sandpaper_polishing(Item.of('kubejs:twinkle_rib'), Ingredient.of('kubejs:twinkle_rib'))
})
