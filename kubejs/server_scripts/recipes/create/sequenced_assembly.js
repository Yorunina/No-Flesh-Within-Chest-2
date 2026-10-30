// priority: 1000
const CommonTransitionalItem = 'create:incomplete_precision_mechanism'
ServerEvents.recipes(event => {
    event.remove({ id: 'create_biotech:sequenced_assembly/bionic_mechanism' })
    event.recipes.create.sequenced_assembly(
        [
            Item.of('create_biotech:bionic_mechanism')
        ],
        'create:brass_sheet',
        [
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'create:cogwheel']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'create:large_cogwheel']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'biomancy:flesh_bits']),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(5)

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:redstone_capacitor')
        ],
        'minecraft:resin_brick',
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
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'minecraft:resin_brick']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'minecraft:slime_ball']),
            event.recipes.create.pressing(CommonTransitionalItem, CommonTransitionalItem),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(3)


    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:random_tick_spring').withChance(0.3),
            Item.of('kubejs:refined_brass_ingot').withChance(0.7),
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

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:structural_bolt')
        ],
        'minecraft:crying_obsidian',
        [
            event.recipes.create.pressing(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'create:brass_ingot']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'minecraft:glass']),
            event.recipes.create.cutting(CommonTransitionalItem, CommonTransitionalItem),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(3)

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:oracle_gate')
        ],
        'kubejs:stable_substrate',
        [
            event.recipes.create.pressing(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'create_connected:control_chip']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:ingots/brass']),
            event.recipes.create.filling(CommonTransitionalItem, [CommonTransitionalItem, Fluid.of('create:potion', 25, { Bottle: "REGULAR", Potion: "minecraft:fire_resistance" })]),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(16)

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:simulated_unit')
        ],
        'kubejs:redstone_capacitor',
        [
            event.recipes.create.pressing(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'minecraft:sea_lantern']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:ingots/brass']),
            event.recipes.create.cutting(CommonTransitionalItem, CommonTransitionalItem),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(3)

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:furnace_core')
        ],
        'kubejs:inner_furnace',
        [
            event.recipes.create.pressing(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'kubejs:flame_crystal']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:ingots/brass']),
            event.recipes.create.filling(CommonTransitionalItem, [CommonTransitionalItem, Fluid.of('minecraft:lava', 250)]),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(3)


    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:thermometer')
        ],
        'minecraft:light_gray_stained_glass',
        [
            event.recipes.create.cutting(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:dusts/redstone']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:ingots/gold']),
            event.recipes.create.filling(CommonTransitionalItem, [CommonTransitionalItem, Fluid.of('minecraft:lava', 250)]),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(3)

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:cyborgization_device')
        ],
        'kubejs:programmable_automatic_core',
        [
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'create:iron_sheet']),
            event.recipes.create.cutting(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, '#forge:ingots/iron']),
            event.recipes.create.filling(CommonTransitionalItem, [CommonTransitionalItem, Fluid.of('minecraft:lava', 250)]),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(5)


    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:world_computer')
        ],
        'create:brass_block',
        [
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'kubejs:reverse_causality_chip']),
            event.recipes.create.cutting(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.filling(CommonTransitionalItem, [CommonTransitionalItem, Fluid.of('createdieselgenerators:ethanol', 250)]),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(8)

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:pure_color_reaction')
        ],
        'minecraft:iron_block',
        [
            event.recipes.create.cutting(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'minecraft:red_dye']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'minecraft:green_dye']),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'minecraft:blue_dye']),
            event.recipes.create.filling(CommonTransitionalItem, [CommonTransitionalItem, Fluid.of('minecraft:milk', 250)]),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(7)

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:blood_crystal_factory')
        ],
        'minecraft:redstone_block',
        [
            event.recipes.create.cutting(CommonTransitionalItem, CommonTransitionalItem),
            event.recipes.create.filling(CommonTransitionalItem, [CommonTransitionalItem, Fluid.of('kubejs:blood_fluid', 250)]),
            event.recipes.create.deploying(CommonTransitionalItem, [CommonTransitionalItem, 'create_connected:control_chip']),
        ]
    )
        .transitionalItem(CommonTransitionalItem)
        .loops(4)
})

ServerEvents.recipes(event => {
    event.recipes.create
        .sequenced_assembly([Item.of('kubejs:genius')], 'kubejs:witch_fibroma', [
            event.recipes.create.deploying('kubejs:incomplete_genius', ['kubejs:incomplete_genius', 'kubejs:world_computer_mechanism']),
            event.recipes.create.deploying('kubejs:incomplete_genius', ['kubejs:incomplete_genius', 'create:cogwheel']),
            event.recipes.create.deploying('kubejs:incomplete_genius', ['kubejs:incomplete_genius', 'create:mechanical_pump']),
            event.recipes.create.deploying('kubejs:incomplete_genius', ['kubejs:incomplete_genius', 'create:spout']),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:night_vision' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:invisibility' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:leaping' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:fire_resistance' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:swiftness' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:slowness' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:turtle_master' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:water_breathing' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:healing' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:harming' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:poison' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:regeneration' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:strength' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:weakness' })
            ]),
            event.recipes.create.filling('kubejs:incomplete_genius', [
                'kubejs:incomplete_genius',
                Fluid.of('create:potion', 1000, { Bottle: 'REGULAR', Potion: 'minecraft:slow_falling' })
            ])
        ])
        .transitionalItem('kubejs:incomplete_genius')
        .loops(1)
    event.recipes.create
        .sequenced_assembly([Item.of('kubejs:flesh_mechanism')], 'kubejs:flesh_sheet', [
            event.recipes.create.deploying('kubejs:incomplete_flesh_mechanism', [
                'kubejs:incomplete_flesh_mechanism',
                'biomancy:bone_fragments'
            ]),
            event.recipes.create.deploying('kubejs:incomplete_flesh_mechanism', [
                'kubejs:incomplete_flesh_mechanism',
                'biomancy:elastic_fibers'
            ]),
            event.recipes.create.deploying('kubejs:incomplete_flesh_mechanism', [
                'kubejs:incomplete_flesh_mechanism',
                'biomancy:mineral_fragment'
            ]),
            event.recipes.create.deploying('kubejs:incomplete_flesh_mechanism', [
                'kubejs:incomplete_flesh_mechanism',
                'biomancy:bio_lumens'
            ]),
            event.recipes.create.deploying('kubejs:incomplete_flesh_mechanism', [
                'kubejs:incomplete_flesh_mechanism',
                'biomancy:exotic_dust'
            ])
        ])
        .transitionalItem('kubejs:incomplete_flesh_mechanism')
        .loops(3)
})
