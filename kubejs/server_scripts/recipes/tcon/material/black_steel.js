// priority: 1000
ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    tconstruct.material('kubejs:black_steel', 'cataclysm:black_steel_ingot', 1, 1)
    tconstruct.material('kubejs:black_steel', 'cataclysm:black_steel_block', 9, 1, 'cataclysm:black_steel_ingot')
    tconstruct.material_fluid('kubejs:black_steel', Fluid.of('kubejs:melted_black_steel', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_black_steel', 90), Ingredient.of('cataclysm:black_steel_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_black_steel', 810), Ingredient.of('cataclysm:black_steel_block'), 800, 900)
    tconstruct.casting_table('cataclysm:black_steel_ingot', Fluid.of('kubejs:melted_black_steel', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('cataclysm:black_steel_ingot', Fluid.of('kubejs:melted_black_steel', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_table('cataclysm:black_steel_nugget', Fluid.of('kubejs:melted_black_steel', 10), 47, Ingredient.of('#tconstruct:casts/multi_use/nugget'), false)
    tconstruct.casting_table('cataclysm:black_steel_nugget', Fluid.of('kubejs:melted_black_steel', 10), 47, Ingredient.of('#tconstruct:casts/single_use/nugget'), true)
    tconstruct.casting_basin('cataclysm:black_steel_block', Fluid.of('kubejs:melted_black_steel', 810), 180)
})