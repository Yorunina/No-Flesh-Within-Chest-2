// priority: 1000
ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    tconstruct.material('kubejs:dark_iron', 'graveyard:dark_iron_ingot', 1, 1)
    tconstruct.material('kubejs:dark_iron', 'graveyard:dark_iron_block', 9, 1, 'graveyard:dark_iron_ingot')
    tconstruct.material_fluid('kubejs:dark_iron', Fluid.of('kubejs:melted_dark_iron', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_dark_iron', 90), Ingredient.of('graveyard:dark_iron_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_dark_iron', 810), Ingredient.of('graveyard:dark_iron_block'), 800, 900)
    tconstruct.casting_table('graveyard:dark_iron_ingot', Fluid.of('kubejs:melted_dark_iron', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('graveyard:dark_iron_ingot', Fluid.of('kubejs:melted_dark_iron', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('graveyard:dark_iron_block', Fluid.of('kubejs:melted_dark_iron', 810), 180)
})
