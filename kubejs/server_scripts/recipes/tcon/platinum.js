ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //illagerinvasion:platinum
    //illagerinvasion:platinum_chunk
    //illagerinvasion:platinum_sheet
    tconstruct.material('kubejs:platinum', 'illagerinvasion:platinum_chunk', 1, 1)
    tconstruct.material('kubejs:platinum', 'illagerinvasion:platinum_sheet', 4, 1, 'illagerinvasion:platinum_chunk')
    tconstruct.material_fluid('kubejs:platinum', Fluid.of('kubejs:melted_platinum', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_platinum', 90), Ingredient.of('illagerinvasion:platinum_chunk'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_platinum', 810), Ingredient.of('illagerinvasion:platinum_sheet'), 800, 900)
    tconstruct.casting_table('illagerinvasion:platinum_chunk', Fluid.of('kubejs:melted_platinum', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('illagerinvasion:platinum_chunk', Fluid.of('kubejs:melted_platinum', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('illagerinvasion:platinum_sheet', Fluid.of('kubejs:melted_platinum', 810), 180)
})
