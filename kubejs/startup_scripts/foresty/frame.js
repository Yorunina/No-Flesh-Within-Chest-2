// priority: 500
ForestryEvents.apiculture(event => {
    event.registerSpecies('test_bee', 'siproeta', 'test_species', true, '#ffaf47')
})


StartupEvents.registry('item', event => {
    event.create('creative_frame', 'forestry:hive_frame')
        .setAgingModifier(0.01)
        .setMaxDamage(0)
})