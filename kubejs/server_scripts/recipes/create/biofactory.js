// priority: 1000
ServerEvents.recipes(event => {
    event.custom({
        type: 'create_biotech:creeper_blast_chamber_high_pressure',
        ingredients: [
            {
                type: 'create_biotech:captured_entity_box',
                entity: 'minecraft:squid'
            }
        ],
        results: [
            {
                item: 'kubejs:spout'
            }
        ]
    })
    event.recipes.create.emptying(['kubejs:third_fabritem', Fluid.of('kubejs:other_fluid', 1000)], 'kubejs:second_fabritem')
    event.recipes.create.haunting('kubejs:sixth_fabritem', 'kubejs:fifth_fabritem')
    event.custom({
        type: 'create_biotech:creeper_blast_chamber_high_pressure',
        ingredients: [{ item: 'create:windmill_bearing' }],
        results: [{ item: 'kubejs:windmill_bearing' }]
    })
    event.custom({
        type: 'create_biotech:creeper_blast_chamber_high_pressure',
        ingredients: [
            {
                type: 'create_biotech:captured_entity_box',
                entity: 'minecraft:elder_guardian'
            }
        ],
        results: [
            {
                item: 'kubejs:item_drain'
            }
        ]
    })
    event.custom({
        type: 'create_biotech:creeper_blast_chamber_high_pressure',
        ingredients: [
            {
                type: 'create_biotech:captured_entity_box',
                entity: 'wildernature:pelican'
            }
        ],
        results: [
            {
                item: 'kubejs:basin'
            }
        ]
    })
})
