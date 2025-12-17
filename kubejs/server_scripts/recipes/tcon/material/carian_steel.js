ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //卡利亚钢
    tconstruct.material('kubejs:carian_steel', 'kubejs:carian_steel', 1, 1)
    tconstruct.material('kubejs:carian_steel', 'kubejs:carian_steel_block', 9, 1, 'kubejs:carian_steel')
    tconstruct.material_fluid('kubejs:carian_steel', Fluid.of('kubejs:melted_carian_steel', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_carian_steel', 90), Ingredient.of('kubejs:carian_steel'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_carian_steel', 810), Ingredient.of('kubejs:carian_steel_block'), 800, 900)
    tconstruct.casting_table('kubejs:carian_steel', Fluid.of('kubejs:melted_carian_steel', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('kubejs:carian_steel', Fluid.of('kubejs:melted_carian_steel', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('kubejs:carian_steel_block', Fluid.of('kubejs:melted_carian_steel', 810), 180)
    tconstruct.melting(Fluid.of('kubejs:melted_lapis_lazuli', 90), Ingredient.of('minecraft:lapis_lazuli'), 800, 100)
    tconstruct.material_fluid('minecraft:lapis_lazuli', Fluid.of('kubejs:melted_lapis_lazuli', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_glintstone', 90), Ingredient.of('kubejs:glintstone'), 800, 100)
    tconstruct.material_fluid('kubejs:glintstone', Fluid.of('kubejs:melted_glintstone', 90), 800)
    tconstruct.alloy(
        Fluid.of('kubejs:melted_carian_steel', 180),
        [
            Fluid.of('tconstruct:liquid_soul', 90),
            Fluid.of('kubejs:melted_glintstone', 180),
            Fluid.of('tconstruct:molten_cobalt', 90)
        ],
        1450
    )
    tconstruct.alloy(
        Fluid.of('kubejs:melted_glintstone', 180),
        [
            Fluid.of('tconstruct:molten_amethyst', 90),
            Fluid.of('kubejs:melted_lapis_lazuli', 90)
        ],
        800
    )
})
