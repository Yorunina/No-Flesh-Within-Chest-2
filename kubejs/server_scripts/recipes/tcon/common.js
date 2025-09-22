// priority: 500
ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //鲜活血肉
    tconstruct.material('kubejs:living_flesh', 'biomancy:living_flesh')
    tconstruct.material('kubejs:creator_mix', 'biomancy:creator_mix')  
    //暗铁
    tconstruct.material('kubejs:dark_iron', 'graveyard:dark_iron_ingot', 1, 1)
    tconstruct.material('kubejs:dark_iron', 'graveyard:dark_iron_block', 9, 1, 'graveyard:dark_iron_ingot')

    tconstruct.material_fluid('kubejs:dark_iron', Fluid.of('kubejs:melted_dark_iron', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_dark_iron', 90), Ingredient.of('graveyard:dark_iron_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_dark_iron', 810), Ingredient.of('graveyard:dark_iron_block'), 800, 900)
    tconstruct.casting_table('graveyard:dark_iron_ingot', Fluid.of('kubejs:melted_dark_iron', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('graveyard:dark_iron_ingot', Fluid.of('kubejs:melted_dark_iron', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('graveyard:dark_iron_block', Fluid.of('kubejs:melted_dark_iron', 810), 180)
    //凋零合金
    tconstruct.material('kubejs:witherite_ingot', 'cataclysm:witherite_ingot', 1, 1)
    tconstruct.material('kubejs:witherite_ingot', 'cataclysm:witherite_block', 9, 1, 'cataclysm:witherite_ingot')

    tconstruct.material_fluid('kubejs:witherite_ingot', Fluid.of('kubejs:melted_witherite', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_witherite', 90), Ingredient.of('cataclysm:witherite_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_witherite', 810), Ingredient.of('cataclysm:witherite_block'), 800, 900)
    tconstruct.casting_table('cataclysm:witherite_ingot', Fluid.of('kubejs:melted_witherite', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('cataclysm:witherite_ingot', Fluid.of('kubejs:melted_witherite', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('cataclysm:witherite_block', Fluid.of('kubejs:melted_witherite', 810), 180)
    //远古金属
    tconstruct.material('kubejs:ancient_metal', 'cataclysm:ancient_metal_ingot', 1, 1)
    tconstruct.material('kubejs:ancient_metal', 'cataclysm:ancient_metal_block', 9, 1, 'cataclysm:ancient_metal_ingot')

    tconstruct.material_fluid('kubejs:ancient_metal', Fluid.of('kubejs:melted_ancient_metal', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_ancient_metal', 90), Ingredient.of('cataclysm:ancient_metal_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_ancient_metal', 810), Ingredient.of('cataclysm:ancient_metal_block'), 800, 900)
    tconstruct.casting_table('cataclysm:ancient_metal_ingot', Fluid.of('kubejs:melted_ancient_metal', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('cataclysm:ancient_metal_ingot', Fluid.of('kubejs:melted_ancient_metal', 90), 47, Ingredient.of('#tconsstruct:casts/single_use/ingot'), true)
    tconstruct.casting_table('cataclysm:ancient_metal_nugget', Fluid.of('kubejs:melted_ancient_metal', 10), 47, Ingredient.of('#tconstruct:casts/multi_use/nugget'), false)
    tconstruct.casting_table('cataclysm:ancient_metal_nugget', Fluid.of('kubejs:melted_ancient_metal', 10), 47, Ingredient.of('#tconstruct:casts/single_use/nugget'), true)
    tconstruct.casting_basin('cataclysm:ancient_metal_block', Fluid.of('kubejs:melted_ancient_metal', 810), 180)
    //黑钢
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
    //腾炎锭
    tconstruct.material('kubejs:ignitium', 'cataclysm:ignitium_ingot', 1, 1)
    tconstruct.material('kubejs:ignitium', 'cataclysm:ignitium_block', 9, 1, 'cataclysm:ignitium_ingot')

    tconstruct.material_fluid('kubejs:ignitium', Fluid.of('kubejs:melted_ignitium', 90), 800)
    tconstruct.melting(Fluid.of('kubejs:melted_ignitium', 90), Ingredient.of('cataclysm:ignitium_ingot'), 800, 100)
    tconstruct.melting(Fluid.of('kubejs:melted_ignitium', 810), Ingredient.of('cataclysm:ignitium_block'), 800, 900)
    tconstruct.casting_table('cataclysm:ignitium_ingot', Fluid.of('kubejs:melted_ignitium', 90), 47, Ingredient.of('#tconstruct:casts/multi_use/ingot'), false)
    tconstruct.casting_table('cataclysm:ignitium_ingot', Fluid.of('kubejs:melted_ignitium', 90), 47, Ingredient.of('#tconstruct:casts/single_use/ingot'), true)
    tconstruct.casting_basin('cataclysm:ignitium_block', Fluid.of('kubejs:melted_ignitium', 810), 180)
})
