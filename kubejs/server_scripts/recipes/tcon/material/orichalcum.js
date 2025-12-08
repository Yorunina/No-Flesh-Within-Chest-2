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
    tconstruct.material('kubejs:mantle_ore', 'kubejs:mantle_ore', 1, 1)
    tconstruct.material_fluid('kubejs:mantle_ore', Fluid.of('kubejs:melted_mantle', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_mantle', 90), Ingredient.of('kubejs:mantle_ore'), 800, 100)
    tconstruct.alloy(
        Fluid.of('kubejs:melted_orichalcum', 500),
        [
            Fluid.of('tconstruct:molten_brass', 400),
            Fluid.of('kubejs:melted_mantle', 300),
            Fluid.of('tconstruct:molten_netherite', 300)
        ],
        1450
    )
})
