// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.ars_nouveau.glyph(
        'kubejs:glyph_horizon_destory',
        [Item.of('minecraft:stone_pickaxe'), Item.of('minecraft:crying_obsidian')],
        10
    )
})
