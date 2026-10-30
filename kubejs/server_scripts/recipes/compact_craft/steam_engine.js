// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.compactcrafting
        .miniaturization([Item.of('kubejs:steam_engine', 1)], Item.of('kubejs:flame_crystal', 1), 200)
        .setLayers([
            CCLayerType.MIXED.withPattern([
                ['b', 'b', 'b'],
                ['b', 'b', 'b'],
                ['b', 'b', 'b']
            ]),
            CCLayerType.MIXED.withPattern([
                ['b', 'b', 'b', 'c'],
                ['b', 'b', 'b', 'c'],
                ['b', 'b', 'b', 'c']
            ]),
            CCLayerType.MIXED.withPattern([
                ['b', 'b', 'b', 'c'],
                ['b', 'b', 'b', 'c'],
                ['b', 'b', 'b', 'c']
            ]),
            CCLayerType.MIXED.withPattern([
                ['b', 'b', 'b', 'c'],
                ['b', 'b', 'b', 'c'],
                ['b', 'b', 'b', 'c']
            ]),
            CCLayerType.MIXED.withPattern([
                ['a', 'a', 'a'],
                ['a', 'a', 'a'],
                ['a', 'a', 'a']
            ])
        ])
        .setComponents(
            new CCBlockComponent().add('a', 'create:blaze_burner').add('b', 'create:fluid_tank').add('c', 'create:steam_engine').build()
        )
})
