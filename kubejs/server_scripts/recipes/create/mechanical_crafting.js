// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.mechanical_crafting('kubejs:amethyst_resonator',
        [
            'GGG',
            'OAO',
            'PCP',
        ],
        {
            G: '#forge:glass',
            A: 'minecraft:amethyst_shard',
            P: '#minecraft:planks',
            C: '#forge:ingots/copper',
            O: '#forge:ingots/gold'
        }
    )

    event.recipes.create.mechanical_crafting(Item.of('kubejs:counterweight_gear', 4),
        [
            'RBBBB',
            'B I O',
            'BI IO',
            'B IGO',
            'BOOOO',
        ],
        {
            R: 'kubejs:refined_brass_ingot',
            O: '#forge:obsidian',
            B: 'create:brass_sheet',
            G: '#forge:dusts/glowstone',
            I: '#forge:ingots/iron'
        }
    )

    event.recipes.create.mechanical_crafting('kubejs:timing_valve',
        [
            'OAO',
            'BEB',
            'BPB',
            'BOB',
        ],
        {
            A: 'minecraft:amethyst_shard',
            O: '#forge:obsidian',
            B: 'create:brass_sheet',
            P: 'minecraft:blaze_powder',
            E: 'create:electron_tube'
        }
    )

    event.recipes.create.mechanical_crafting('compactcrafting:field_projector',
        [
            ' S ',
            'AAA',
        ],
        {
            A: 'createdieselgenerators:asphalt_block',
            S: 'minecraft:sea_lantern',
        }
    )
    event.recipes.create.mechanical_crafting('compactcrafting:rescan_proxy',
        [
            ' S ',
            'AAA',
        ],
        {
            A: 'createdieselgenerators:asphalt_block',
            S: 'minecraft:magenta_dye',
        }
    )
    event.recipes.create.mechanical_crafting('compactcrafting:match_proxy',
        [
            ' S ',
            'AAA',
        ],
        {
            A: 'createdieselgenerators:asphalt_block',
            S: 'minecraft:green_dye',
        }
    )
    event.recipes.create.mechanical_crafting('kubejs:lava_life_cycle_system',
        [
            'IBAB',
            'ISRS',
            'IGCG',
            'SSSS',
        ],
        {
            G: 'minecraft:glass',
            I: 'minecraft:iron_bars',
            R: 'minecraft:blaze_rod',
            C: 'chestcavity:blaze_core',
            S: 'minecraft:iron_ingot',
            A: 'minecraft:redstone',
            B: 'create:iron_sheet'
        }
    )

    event.recipes.create.mechanical_crafting('kubejs:energy_bottle_red', [
        ' AAA ',
        'ABEBA',
        'ABDBA',
        'ABEBA',
        'AAAAA'
    ], {
        A: 'minecraft:redstone_block',
        B: 'minecraft:iron_ingot',
        D: 'kubejs:flame_crystal',
        E: 'minecraft:netherite_ingot',
    })

    event.recipes.create.mechanical_crafting('kubejs:blaze_pressurizer', [
        ' AAA ',
        '  E  ',
        ' ADA ',
        ' AFA ',
        'BBBBB'
    ], {
        A: 'minecraft:magma_block',
        B: 'minecraft:iron_ingot',
        D: 'kubejs:flame_crystal',
        E: 'minecraft:netherite_ingot',
        F: 'minecraft:fire_charge',
    })

    event.recipes.create.mechanical_crafting('kubejs:revolution_cable', [
        'IIIII',
        'RGAGR',
        'IIIII',
    ], {
        I: 'create:iron_sheet',
        R: 'minecraft:redstone',
        A: 'minecraft:amethyst_shard',
        G: 'minecraft:glowstone_dust',
    })

    event.recipes.create.mechanical_crafting('kubejs:revolution_relay', [
        '  A  ',
        'RGRGR',
        'IIIII',
    ], {
        I: 'create:iron_sheet',
        R: 'minecraft:redstone',
        A: 'minecraft:amethyst_shard',
        G: 'minecraft:glowstone_dust',
    })

    event.recipes.create.mechanical_crafting('kubejs:revolution_delay', [
        '  A  ',
        'RGRGR',
        'IIIII',
    ], {
        I: 'create:iron_sheet',
        R: 'minecraft:redstone',
        A: 'minecraft:lapis_lazuli',
        G: 'minecraft:glowstone_dust',
    })

	event.recipes.create.mechanical_crafting('kubejs:revolution_bell', [
		' AAA ',
		'ACBCA',
		'ABEBA',
		'ACDCA',
		' AFA ',
	], {
		A: '#forge:plates/brass',
		B: 'minecraft:glowstone_dust',
		C: 'minecraft:redstone',
		D: 'create:minecart_coupling',
		E: 'create:clockwork_bearing',
		F: '#minecraft:anvil'
	})
})

