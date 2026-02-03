// priority: 1000
AStages.addRestrictionForRecipe('gula/gula_injection_recipe', 'gula_injection_recipe', 'minecraft:crafting', 'kubejs:gula_injection_manual_only')

ServerEvents.recipes(event => {
    event.shaped('kubejs:gula_injection', [
        ['kaleidoscope_cookery:caterpillar', 'cornucopia:cornucopia', 'kaleidoscope_cookery:caterpillar'],
        ['kubejs:living_beef_wellington', 'kubejs:player_27_injection', 'kubejs:mashed_potato_pancreas'],
        ['kubejs:deserted_gula_worm_nest', 'kubejs:deserted_gula_worm_nest', 'kubejs:deserted_gula_worm_nest']
    ]).id('kubejs:gula_injection_manual_only')
})