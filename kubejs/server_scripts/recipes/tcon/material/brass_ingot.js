ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //黄铜锭（机械动力）
    tconstruct.material('kubejs:brass_ingot', 'create:brass_ingot', 1, 1)
    tconstruct.material('kubejs:brass_ingot', 'create:brass_block', 9, 1, 'create:brass_ingot')
    tconstruct.material_fluid('kubejs:brass_ingot', Fluid.of('tconstruct:molten_brass', 90), 800)
    tconstruct.melting(Fluid.of('tconstruct:molten_brass', 90), Ingredient.of('create:brass_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('tconstruct:molten_brass', 810), Ingredient.of('create:brass_block'), 800, 900)
    tconstruct.casting_table('create:brass_ingot', Fluid.of('tconstruct:molten_brass', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('create:brass_ingot', Fluid.of('tconstruct:molten_brass', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_table('create:brass_nugget', Fluid.of('tconstruct:molten_brass', 10), 47, Ingredient.of('#tconstruct:casts/multi_use/nugget'), false)
    tconstruct.casting_table('create:brass_nugget', Fluid.of('tconstruct:molten_brass', 10), 47, Ingredient.of('#tconstruct:casts/single_use/nugget'), true)
    tconstruct.casting_basin('create:brass_block', Fluid.of('tconstruct:molten_brass', 810), 180)
})