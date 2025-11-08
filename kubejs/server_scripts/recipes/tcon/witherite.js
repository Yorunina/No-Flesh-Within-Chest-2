ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //凋零合金（灾变）
    tconstruct.material('kubejs:witherite_ingot', 'cataclysm:witherite_ingot', 1, 1)
    tconstruct.material('kubejs:witherite_ingot', 'cataclysm:witherite_block', 9, 1, 'cataclysm:witherite_ingot')
    tconstruct.material_fluid('kubejs:witherite_ingot', Fluid.of('kubejs:melted_witherite', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_witherite', 90), Ingredient.of('cataclysm:witherite_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_witherite', 810), Ingredient.of('cataclysm:witherite_block'), 800, 900)
    tconstruct.casting_table('cataclysm:witherite_ingot', Fluid.of('kubejs:melted_witherite', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('cataclysm:witherite_ingot', Fluid.of('kubejs:melted_witherite', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('cataclysm:witherite_block', Fluid.of('kubejs:melted_witherite', 810), 180)
})
