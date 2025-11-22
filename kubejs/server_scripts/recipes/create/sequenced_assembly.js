// priority: 1000
const CommonTransitionalItem = 'create:incomplete_precision_mechanism'
ServerEvents.recipes(event => {
    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:redstone_capacitor')
        ],
        'vanillabackport:resin_brick',
        [
            event.recipes.create.pressing(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:dusts/redstone']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:dusts/glowstone']),
            event.recipes.create.cutting(CommonTransitionalItem, CommonTransitionalItem),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(3)

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:stable_substrate')
        ],
        'minecraft:slime_ball',
        [
            event.recipes.create.pressing(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'vanillabackport:resin_brick']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'minecraft:slime_ball']),
            event.recipes.create.pressing(CommonTransitionalItem, CommonTransitionalItem),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(3)


    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:random_tick_spring').withChance(0.1),
            Item.of('kubejs:refined_brass_ingot').withChance(0.9),
        ],
        'kubejs:refined_brass_ingot',
        [
            event.recipes.create.pressing(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:gems/amethyst']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:ingots/iron']),
            event.recipes.create.filling(CommonTransitionalItem, [CommonTransitionalItem, Fluid.of('createdieselgenerators:diesel', 25)]),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(3)
})

