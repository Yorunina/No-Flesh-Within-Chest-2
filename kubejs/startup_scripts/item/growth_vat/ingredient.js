// priority: 1000
StartupEvents.registry('item', event => {
    event.create('simple_culture_medium').texture('kubejs:item/materials/simple_culture_medium')
    event.create('culture_medium').texture('kubejs:item/materials/culture_medium')
    event.create('mutation_culture_medium').texture('kubejs:item/materials/mutation_culture_medium')
    event.create('mixed_culture_medium').texture('kubejs:item/materials/mixed_culture_medium')
    // event.create('contaminated_culture_medium').texture('kubejs:item/materials/contaminated_culture_medium')
    event.create('proliferation_culture_medium').texture('kubejs:item/materials/proliferation_culture_medium')
})