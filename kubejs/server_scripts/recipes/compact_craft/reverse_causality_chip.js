// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.compactcrafting
        .miniaturization(
            [Item.of('kubejs:reverse_causality_chip', 1)],
            Item.of('kubejs:unstable_matter', 1),
            200
        ).setLayers([
            CCLayerType.MIXED.withPattern([
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
                ['A', 'B', 'D', 'D', 'E', 'D', 'D', 'B', 'A'],
                ['A', 'D', 'D', 'D', 'E', 'D', 'D', 'D', 'A'],
                ['A', 'D', 'D', 'D', 'F', 'D', 'D', 'D', 'A'],
                ['A', 'E', 'E', 'G', 'H', 'G', 'E', 'E', 'A'],
                ['A', 'D', 'D', 'D', 'F', 'D', 'D', 'D', 'A'],
                ['A', 'D', 'D', 'D', 'E', 'D', 'D', 'D', 'A'],
                ['A', 'B', 'D', 'D', 'E', 'D', 'D', 'B', 'A'],
                ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']
            ]),
        ])
        .setComponents(new CCBlockComponent()
            .add('A', 'create:brass_block')
            .add('B', 'kubejs:buffer_circuit')
            .add('G', 'kubejs:spatial_stabilizer')
            .add('E', 'kubejs:data_bus')
            .add('D', 'kubejs:circuit_board')
            .add('F', 'kubejs:timing_module')
            .add('H', 'kubejs:oracle_module')
            .build()
        )
})