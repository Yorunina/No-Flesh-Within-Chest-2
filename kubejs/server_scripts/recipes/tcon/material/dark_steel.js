ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //玄铁
    tconstruct.material('kubejs:dark_steel', 'kubejs:dark_steel', 1, 1)
    tconstruct.material('kubejs:dark_steel', 'kubejs:dark_block', 9, 1, 'kubejs:dark_steel')
    tconstruct.material_fluid('kubejs:dark_steel', Fluid.of('kubejs:melted_dark_steel', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_dark_steel', 90), Ingredient.of('kubejs:dark_steel'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_dark_steel', 810), Ingredient.of('kubejs:dark_block'), 800, 900)
    tconstruct.casting_table('kubejs:dark_steel', Fluid.of('kubejs:melted_dark_steel', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('kubejs:dark_steel', Fluid.of('kubejs:melted_dark_steel', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('kubejs:dark_block', Fluid.of('kubejs:melted_dark_steel', 810), 180)
    tconstruct.alloy(
        Fluid.of('kubejs:melted_dark_steel', 90),
        [
            Fluid.of('tconstruct:molten_steel', 90),
            Fluid.of('kubejs:melted_patterned', 90),
            Fluid.of('kubejs:melted_black_steel', 90)
        ],
        1450
    )
})
