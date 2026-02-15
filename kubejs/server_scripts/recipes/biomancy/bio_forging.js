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
})
