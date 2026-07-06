// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.biomancy.bio_brewing(['minecraft:redstone', 'biomancy:genetic_compound', 'biomancy:decaying_additive', 'minecraft:glowstone_dust'], 'kubejs:jar_of_vacuum', 'kubejs:jar_of_mystery')

    event.recipes.biomancy.bio_brewing(['biomancy:nutrient_bar', 'biomancy:regenerative_fluid', 'biomancy:gelling_agent', 'biomancy:flesh_bits'], 'minecraft:glass_bottle', Item.of('kubejs:simple_culture_medium', 4))
    event.recipes.biomancy.bio_brewing(['biomancy:nutrient_bar', 'biomancy:regenerative_fluid', 'biomancy:gelling_agent', 'biomancy:bloomberry'], 'minecraft:glass_bottle', Item.of('kubejs:culture_medium', 4))

    event.recipes.biomancy.bio_brewing(['minecraft:redstone', 'biomancy:toxin_extract', 'biomancy:exotic_compound', 'biomancy:withering_ooze'], 'kubejs:culture_medium', 'kubejs:mutation_culture_medium')
    event.recipes.biomancy.bio_brewing(['minecraft:redstone', 'biomancy:rejuvenation_serum', 'minecraft:amethyst_shard', 'biomancy:bio_lumens'], 'kubejs:culture_medium', 'kubejs:mixed_culture_medium')
    event.recipes.biomancy.bio_brewing(['minecraft:redstone', 'biomancy:ageing_serum', 'biomancy:breeding_stimulant', 'minecraft:golden_apple'], 'kubejs:culture_medium', 'kubejs:proliferation_culture_medium')

    event.recipes.biomancy.bio_brewing(['minecraft:nether_wart'], 'biomancy:cleansing_serum', 'kubejs:precursor_pheromone_serum')
    event.recipes.biomancy.bio_brewing(['biomancy:rejuvenation_serum'], 'kubejs:precursor_pheromone_serum', 'kubejs:alpha_pheromone_serum')
    event.recipes.biomancy.bio_brewing(['biomancy:ageing_serum'], 'kubejs:precursor_pheromone_serum', 'kubejs:beta_pheromone_serum')
    event.recipes.biomancy.bio_brewing(['biomancy:breeding_stimulant'], 'kubejs:precursor_pheromone_serum', 'kubejs:gamma_pheromone_serum')
    event.recipes.biomancy.bio_brewing(['biomancy:bio_lumens'], 'kubejs:alpha_pheromone_serum', 'kubejs:beta_pheromone_serum')
    event.recipes.biomancy.bio_brewing(['biomancy:bio_lumens'], 'kubejs:beta_pheromone_serum', 'kubejs:gamma_pheromone_serum')
    event.recipes.biomancy.bio_brewing(['biomancy:bio_lumens'], 'kubejs:gamma_pheromone_serum', 'kubejs:alpha_pheromone_serum')

    // 分化血清
    event.recipes.biomancy.bio_brewing(['biomancy:flesh_bits', 'minecraft:pink_dye', 'minecraft:sugar'], 'kubejs:empty_inducer_serum', 'kubejs:pig_inducer_serum')
})