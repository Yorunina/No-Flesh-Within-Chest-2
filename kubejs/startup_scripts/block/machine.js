// priority: 500
StartupEvents.registry('block', event => {
    event.create('kubejs:world_computer', 'custommachinery')
        .machine('kubejs:world_computer')
    event.create('kubejs:eternal_altar', 'custommachinery')
        .machine('kubejs:eternal_altar')
    event.create('kubejs:mantle_energy_extractor', 'custommachinery')
        .machine('kubejs:mantle_energy_extractor')
})