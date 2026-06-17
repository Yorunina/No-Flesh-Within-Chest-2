// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.biomancy.bio_forging([Ingredient.of('#farm_and_charm:dough', 4), Ingredient.of('#kubejs:muscle'), Item.of('biomancy:healing_additive')], Item.of('kubejs:gluten_muscle'), 'biomancy:organ', 10)
    event.recipes.biomancy.bio_forging([Item.of('bakery:baguette'), Ingredient.of('#kubejs:bone'), Item.of('biomancy:healing_additive')], Item.of('kubejs:baguette_bone'), 'biomancy:organ', 10)
    event.recipes.biomancy.bio_forging([Item.of('minecraft:sugar', 8), Ingredient.of('#kubejs:heart'), Item.of('biomancy:healing_additive')], Item.of('kubejs:sweet_heart'), 'biomancy:organ', 10)
    event.recipes.biomancy.bio_forging([Item.of('brewery:mashed_potatoes', 8), Item.of('kubejs:taste_worm_powder'), Item.of('biomancy:healing_additive'), Item.of('biomancy:living_flesh', 4)], Item.of('kubejs:mashed_potato_pancreas'), 'biomancy:organ', 20)
    event.recipes.biomancy.bio_forging([Item.of('candlelight:beef_wellington', 8), Item.of('kubejs:taste_worm_powder'), Item.of('biomancy:healing_additive'), Item.of('biomancy:living_flesh', 4)], Item.of('kubejs:living_beef_wellington'), 'biomancy:organ', 20)

    event.recipes.biomancy.bio_forging([Item.of('biomancy:acid_extract', 4), Item.of('biomancy:mineral_fragment', 4), Item.of('biomancy:bone_fragments', 4), Item.of('bakery:jar', 1)], Item.of('kubejs:small_acid_tank'), 'biomancy:organ', 30)

    event.recipes.biomancy.bio_forging([Item.of('biomancy:elastic_fibers', 1), Item.of('biomancy:mineral_fragment', 1), Item.of('minecraft:diamond', 1)], Item.of('kubejs:empty_injection'), 'biomancy:organ', 8)

    event.remove({ output: 'modulargolems:metal_golem_template' })
    event.recipes.biomancy.bio_forging([Item.of('minecraft:clay_ball', 4), Item.of('biomancy:flesh_bits', 1), Ingredient.of('#forge:ingots/copper', 1)], Item.of('modulargolems:metal_golem_template'), 'biomancy:components', 2)

    event.recipes.biomancy.bio_forging([Item.of('kubejs:player_21_injection', 1), Item.of('kubejs:inactivated_neuron_tumor', 1), Item.of('biomancy:healing_additive', 1)], Item.of('kubejs:player_25_injection'), 'biomancy:components', 20)

    event.recipes.biomancy.bio_forging([Item.of('kubejs:player_25_injection', 1), Item.of('biomancy:bloomberry', 1), Item.of('biomancy:frenzy_serum', 1)], Item.of('kubejs:player_27_injection'), 'biomancy:components', 50)

    event.recipes.biomancy.bio_forging([Item.of('graveyard:dark_iron_block', 1), Item.of('kubejs:small_acid_tank', 2), Item.of('minecraft:glass', 6)], Item.of('kubejs:growth_vat'), 'biomancy:machines', 50)

    event.recipes.biomancy.bio_forging([Item.of('biomancy:malignant_flesh', 1), Item.of('biomancy:acid_extract', 4)], Item.of('biomancy:primal_orifice'), 'biomancy:misc', 10)

    event.recipes.biomancy.bio_forging([Item.of('biomancy:healing_additive', 1), Item.of('biomancy:living_flesh', 16), Item.of('chestcavity:chest_opener', 1), Item.of('minecraft:iron_ingot', 16)], Item.of('chestcavity:surgical_box', '{Inventory:[],InventoryType:"kubejs:cc_inventory_types/player_17",Size:17}'), 'biomancy:organ', 10)

    event.recipes.biomancy.bio_forging([Item.of('biomancy:healing_additive', 1), Item.of('kubejs:worm_of_taste', 1), Item.of('biomancy:toxin_gland', 1)], Item.of('kubejs:tasty_gland'), 'biomancy:organ', 10)

    event.recipes.biomancy.bio_forging([Item.of('biomancy:elastic_fibers', 1), Item.of('biomancy:mineral_fragment', 1), Item.of('minecraft:ender_eye', 1)], Item.of('kubejs:blood_extractor'), 'biomancy:organ', 8)

    event.recipes.biomancy.bio_forging([Item.of('biomancy:exotic_dust', 1), Item.of('minecraft:chorus_fruit', 1), Item.of('kubejs:rumen', 1)], Item.of('kubejs:void_stomach_pouch'), 'biomancy:organ', 20)

    event.recipes.biomancy.bio_forging([Ingredient.of('#forge:heads', 1), Item.of('kubejs:silverfish_gland', 1), Item.of('biomancy:bio_lumens', 1)], Item.of('kubejs:animted_soul'), 'biomancy:organ', 20)

    event.recipes.biomancy.bio_forging([Item.of('kubejs:deserted_gula_worm_nest'), Item.of('biomancy:bloomberry'), Item.of('kubejs:human_meat_sausage'), Item.of('minecraft:target')], Item.of('kubejs:gula_beacon'), 'biomancy:organ', 50)

    event.recipes.biomancy.bio_forging([Ingredient.of('#kubejs:liver'), Item.of('minecraft:compass'), Item.of('biomancy:flesh_bits')], Item.of('kubejs:navigating_liver'), 'biomancy:organ', 20)
    event.recipes.biomancy.bio_forging([Item.of('minecraft:map'), Item.of('minecraft:leather'), Item.of('minecraft:redstone')], Item.of('maa:structure_selector'), 'biomancy:organ', 5)
    event.recipes.biomancy.bio_forging([Item.of('minecraft:map'), Item.of('minecraft:leather'), Item.of('minecraft:mossy_cobblestone')], Item.of('maa:biome_selector'), 'biomancy:organ', 5)
    event.recipes.biomancy.bio_forging([Item.of('minecraft:map'), Item.of('minecraft:leather'), Item.of('minecraft:diamond')], Item.of('maa:create_ore_excavation_selector'), 'biomancy:organ', 5)

    event.recipes.biomancy.bio_forging([Ingredient.of('#kubejs:heart'), Item.of('biomancy:healing_additive'), Item.of('minecraft:enchanted_golden_apple'), Item.of('biomancy:flesh_bits', 4)], Item.of('kubejs:heart_of_mercy'), 'biomancy:organ', 100)
})