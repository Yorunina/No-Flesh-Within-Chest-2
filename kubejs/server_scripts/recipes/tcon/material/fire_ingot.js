ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //熔岩合金
    tconstruct.material('kubejs:fire_ingot', 'kubejs:fire_ingot', 1, 1)
    tconstruct.material('kubejs:fire_ingot', 'kubejs:fire_block', 9, 1, 'kubejs:fire_ingot')
    tconstruct.material_fluid('kubejs:fire_ingot', Fluid.of('kubejs:melted_fire_ingot', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_fire_ingot', 90), Ingredient.of('kubejs:fire_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_fire_ingot', 810), Ingredient.of('kubejs:fire_block'), 800, 900)
    tconstruct.casting_table('kubejs:fire_ingot', Fluid.of('kubejs:melted_fire_ingot', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('kubejs:fire_ingot', Fluid.of('kubejs:melted_fire_ingot', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('kubejs:fire_block', Fluid.of('kubejs:melted_fire_ingot', 810), 180)
    tconstruct.material_fluid('minecraft:magma_block', Fluid.of('minecraft:lava', 90), 800)
    tconstruct.melting(Fluid.of('minecraft:lava', 90), Ingredient.of('minecraft:magma_block'), 800, 100)
    tconstruct.alloy(
        Fluid.of('kubejs:melted_fire_ingot', 90),
        [
            Fluid.of('minecraft:lava', 1000),
            Fluid.of('tconstruct:molten_netherite', 90)
        ],
        1450
    )
})
