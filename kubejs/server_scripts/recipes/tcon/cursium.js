ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //凋零合金（灾变）
    tconstruct.material('kubejs:cursium_ingot', 'cataclysm:cursium_ingot', 1, 1)
    tconstruct.material('kubejs:cursium_ingot', 'cataclysm:cursium_block', 9, 1, 'cataclysm:cursium_ingot')
    tconstruct.material_fluid('kubejs:cursium_ingot', Fluid.of('kubejs:melted_cursium', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_cursium', 90), Ingredient.of('cataclysm:cursium_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_cursium', 810), Ingredient.of('cataclysm:cursium_block'), 800, 900)
    tconstruct.casting_table('cataclysm:cursium_ingot', Fluid.of('kubejs:melted_cursium', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('cataclysm:cursium_ingot', Fluid.of('kubejs:melted_cursium', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('cataclysm:cursium_block', Fluid.of('kubejs:melted_cursium', 810), 180)
})
