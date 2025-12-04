// priority: 1000
AStages.addRestrictionForRecipe('create/genesis_blueprint_recipe', 'world_computer_3', 'minecraft:crafting', 'kubejs:creative_motor_manual_only')

ServerEvents.recipes(event => {
    event.shaped('create:creative_motor', [
        ['create:chromatic_compound', 'create:chromatic_compound', 'create:chromatic_compound'],
        ['create:chromatic_compound', 'createdieselgenerators:diesel_engine', 'create:chromatic_compound'],
        ['create:chromatic_compound', 'create:chromatic_compound', 'create:chromatic_compound']
    ]).id('kubejs:creative_motor_manual_only')
})
