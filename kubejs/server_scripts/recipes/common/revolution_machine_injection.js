// priority: 1000
AStages.addRestrictionForRecipe('revolution_machine/revolution_machine_injection_recipe', 'revolution_machine_injection_recipe', 'minecraft:crafting', 'kubejs:revolution_machine_injection_manual_only')

ServerEvents.recipes(event => {
    event.shaped('kubejs:revolution_machine_injection', [
        ['kubejs:revolution_bell', 'kubejs:immortal_volcanic_rock', 'cataclysm:ignitium_ingot'],
        ['kubejs:revolution_cable', 'kubejs:player_27_injection', 'kubejs:revolution_cable'],
        ['create_connected:control_chip', 'create:blaze_burner', 'createdieselgenerators:engine_turbocharger']
    ]).id('kubejs:revolution_machine_injection_manual_only')
})