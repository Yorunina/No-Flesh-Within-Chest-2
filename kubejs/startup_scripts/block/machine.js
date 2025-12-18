// priority: 500
StartupEvents.registry('block', event => {
    event.create('kubejs:world_computer', 'custommachinery')
        .machine('kubejs:world_computer')
    event.create('kubejs:gateways', 'custommachinery')
        .machine('kubejs:gateways')
})