ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //山铜
    tconstruct.material('kubejs:orichalcum', 'kubejs:orichalcum', 1, 1)
    tconstruct.material('kubejs:orichalcum', 'kubejs:orichalcum_block', 9, 1, 'kubejs:orichalcum')
    tconstruct.material_fluid('kubejs:orichalcum', Fluid.of('kubejs:melted_orichalcum', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_orichalcum', 90), Ingredient.of('kubejs:orichalcum'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_orichalcum', 810), Ingredient.of('kubejs:orichalcum_block'), 800, 900)
    tconstruct.casting_table('kubejs:orichalcum', Fluid.of('kubejs:melted_orichalcum', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('kubejs:orichalcum', Fluid.of('kubejs:melted_orichalcum', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('kubejs:orichalcum_block', Fluid.of('kubejs:melted_orichalcum', 810), 180)
    //黄铜(机械动力)
    tconstruct.material('kubejs:brass_ingot', 'create:brass_ingot', 1, 1)
    tconstruct.casting_table('create:brass_ingot', Fluid.of('tconstruct:molten_brass', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('create:brass_ingot', Fluid.of('tconstruct:molten_brass', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.alloy(
        Fluid.of('kubejs:melted_orichalcum', 90),
        [
            Fluid.of('tconstruct:molten_brass', 90),
            Fluid.of('tconstruct:molten_steel', 90),
            Fluid.of('tconstruct:molten_netherite', 90)
        ],
        1450
    )
})
