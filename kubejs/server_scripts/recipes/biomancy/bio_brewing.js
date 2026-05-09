// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.biomancy.bio_brewing(['minecraft:redstone', 'biomancy:genetic_compound', 'biomancy:decaying_additive', 'minecraft:glowstone_dust'], 'kubejs:jar_of_vacuum', 'kubejs:jar_of_mystery')

    event.recipes.biomancy.bio_brewing(['biomancy:nutrient_bar', 'biomancy:regenerative_fluid', 'biomancy:gelling_agent', 'biomancy:flesh_bits'], 'minecraft:glass_bottle', 'kubejs:simple_culture_medium')
    event.recipes.biomancy.bio_brewing(['biomancy:nutrient_bar', 'biomancy:regenerative_fluid', 'biomancy:gelling_agent', 'biomancy:bloomberry'], 'minecraft:glass_bottle', 'kubejs:culture_medium')
    
    event.recipes.biomancy.bio_brewing(['minecraft:redstone', 'biomancy:toxin_extract', 'biomancy:exotic_compound', 'biomancy:withering_ooze'], 'kubejs:culture_medium', 'kubejs:mutation_culture_medium')
    event.recipes.biomancy.bio_brewing(['minecraft:redstone', 'biomancy:rejuvenation_serum', 'minecraft:amethyst_shard', 'biomancy:bio_lumens'], 'kubejs:culture_medium', 'kubejs:mixed_culture_medium')
    event.recipes.biomancy.bio_brewing(['minecraft:redstone', 'biomancy:ageing_serum', 'biomancy:breeding_stimulant', 'minecraft:golden_apple'], 'kubejs:culture_medium', 'kubejs:proliferation_culture_medium')
})
