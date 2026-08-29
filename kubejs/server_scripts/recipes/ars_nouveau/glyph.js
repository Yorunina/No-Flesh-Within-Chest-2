// priority: 1000
ServerEvents.recipes(event => {
    // 请注意，此Id设置为必须，否则无法在抄写台上使用
    event.recipes.ars_nouveau.glyph(
        'kubejs:glyph_horizon_destory',
        [Item.of('minecraft:stone_pickaxe'), Item.of('minecraft:crying_obsidian')],
        10
    ).id('kubejs:glyph_horizon_destory')
})
