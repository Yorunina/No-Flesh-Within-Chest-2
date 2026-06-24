// priority: 1000
ServerEvents.recipes(event => {
    event.remove({ output: 'cataclysm:mechanical_fusion_anvil' })
    event.shaped('cataclysm:mechanical_fusion_anvil', [
        ['minecraft:redstone_block', 'minecraft:blackstone', 'minecraft:redstone_block'],
        ['cataclysm:witherite_ingot', 'minecraft:anvil', 'cataclysm:witherite_ingot'],
        ['minecraft:redstone_block', 'minecraft:blackstone', 'minecraft:redstone_block']
    ])
    event.remove({ id: 'mbtool:mbtool' })
    event.shaped('mbtool:mbtool', [
        ['minecraft:copper_ingot', 'supplementaries:cannon', 'minecraft:copper_ingot'],
        ['minecraft:copper_ingot', 'minecraft:anvil', 'minecraft:copper_ingot'],
        ['minecraft:copper_ingot', 'minecraft:book', 'minecraft:copper_ingot']
    ])
    event.remove({ id: 'tetravsikt:thermal_cell' })
    event.shaped(Item.of('tetra:thermal_cell', '{Damage:128}'), [
        ['', 'tetra:metal_scrap', 'tetra:metal_scrap'],
        ['tetra:metal_scrap', 'minecraft:copper_ingot', 'tetra:metal_scrap'],
        ['tetra:metal_scrap', 'tetra:metal_scrap', '']
    ])
    event.shaped(Item.of('torchmaster:feral_flare_lantern'), [
        ['', 'minecraft:gold_ingot', ''],
        ['#forge:glass', 'minecraft:glow_berries', '#forge:glass'],
        ['', 'minecraft:gold_ingot', '']
    ])
    event.shaped(Item.of('torchmaster:feral_flare_lantern'), [
        ['', 'minecraft:gold_ingot', ''],
        ['#forge:glass', 'minecraft:glow_ink_sac', '#forge:glass'],
        ['', 'minecraft:gold_ingot', '']
    ])
    event.shaped(Item.of('torchmaster:feral_flare_lantern'), [
        ['', 'minecraft:gold_ingot', ''],
        ['#forge:glass', 'minecraft:orange_dye', '#forge:glass'],
        ['', 'minecraft:gold_ingot', '']
    ])
    event.remove({ id: 'biomancy:crafting/primordial_core' })
    event.shaped(Item.of('biomancy:primordial_core'), [
        ['', '#forge:raw_meats', ''],
        ['#forge:raw_meats', '#kubejs:heart', '#forge:raw_meats'],
        ['', '#forge:raw_meats', '']
    ])
    event.remove({ id: 'ropebridge:ladder_builder' })
    event.remove({ id: 'ropebridge:bridge_builder' })
    event.remove({ id: 'ropebridge:rope' })
    event.shaped(Item.of('ropebridge:ladder_builder'), [
        ['#forge:ingots/iron', '#forge:ropes', 'minecraft:ladder'],
        ['#forge:ingots/iron', '#minecraft:logs', '#minecraft:logs'],
        ['#forge:ingots/iron', 'minecraft:lever', '']
    ])
    event.shaped(Item.of('ropebridge:bridge_builder'), [
        ['#forge:ingots/iron', '#forge:ropes', '#minecraft:slabs'],
        ['#forge:ingots/iron', '#minecraft:logs', '#minecraft:logs'],
        ['#forge:ingots/iron', 'minecraft:lever', '']
    ])

    event.shaped('minecraft:enchanted_golden_apple', [
        ['minecraft:gold_block', 'minecraft:gold_block', 'minecraft:gold_block'],
        ['minecraft:gold_block', 'minecraft:golden_apple', 'minecraft:gold_block'],
        ['minecraft:gold_block', 'minecraft:gold_block', 'minecraft:gold_block']
    ])
    event.shaped('kubejs:wide_angle_lens', [
        ['#forge:ingots/nether_brick', '#forge:ingots/copper', '#forge:ingots/nether_brick'],
        ['#forge:ingots/copper', '#forge:glass', '#forge:ingots/copper'],
        ['#forge:ingots/nether_brick', '#forge:ingots/copper', '#forge:ingots/nether_brick']
    ])
    event.shaped('kubejs:reverse_causality_lens', [
        ['kubejs:refined_brass_ingot', '#forge:ingots/gold', 'kubejs:refined_brass_ingot'],
        ['#forge:ingots/gold', '#forge:glass', '#forge:ingots/gold'],
        ['kubejs:refined_brass_ingot', '#forge:ingots/gold', 'kubejs:refined_brass_ingot']
    ])
    event.shaped('kubejs:exorcism_lens', [
        ['graveyard:dark_iron_ingot', '#forge:ingots/iron', 'graveyard:dark_iron_ingot'],
        ['#forge:ingots/iron', '#forge:glass', '#forge:ingots/iron'],
        ['graveyard:dark_iron_ingot', '#forge:ingots/iron', 'graveyard:dark_iron_ingot']
    ])
    event.shaped('kubejs:frost_lens', [
        ['', '#forge:ingots/iron', ''],
        ['#forge:ingots/iron', 'minecraft:blue_ice', '#forge:ingots/iron'],
        ['', '#forge:ingots/iron', '']
    ])
    event.remove({ id: 'exposure_polaroid:instant_black_and_white_slide' })
    event.shaped(Item.of('exposure_polaroid:instant_black_and_white_slide', 3), [
        ['', '', ''],
        ['#forge:dyes/white', '#forge:dyes/black', '#forge:dyes/white'],
        ['minecraft:paper', 'minecraft:paper', 'minecraft:paper']
    ])
    event.remove({ id: 'exposure_polaroid:instant_color_slide' })
    event.shaped(Item.of('exposure_polaroid:instant_color_slide', 3), [
        ['', '', ''],
        ['minecraft:red_dye', 'minecraft:yellow_dye', 'minecraft:blue_dye'],
        ['minecraft:paper', 'minecraft:paper', 'minecraft:paper']
    ])
    event.remove({ id: 'exposure_polaroid:high_sensitivity_instant_black_and_white_slide' })
    event.shaped(Item.of('exposure_polaroid:high_sensitivity_instant_black_and_white_slide', 3), [
        ['', 'minecraft:prismarine_crystals', ''],
        ['#forge:dyes/white', '#forge:dyes/black', '#forge:dyes/white'],
        ['minecraft:paper', 'minecraft:paper', 'minecraft:paper']
    ])
    event.remove({ id: 'exposure_polaroid:high_sensitivity_instant_color_slide' })
    event.shaped(Item.of('exposure_polaroid:high_sensitivity_instant_color_slide', 3), [
        ['', 'minecraft:prismarine_crystals', ''],
        ['minecraft:red_dye', 'minecraft:yellow_dye', 'minecraft:blue_dye'],
        ['minecraft:paper', 'minecraft:paper', 'minecraft:paper']
    ])
    event.remove({ id: 'waystones:warp_stone' })
    event.shaped(Item.of('waystones:warp_stone'), [
        ['minecraft:gold_nugget', 'minecraft:iron_nugget', 'minecraft:gold_nugget'],
        ['minecraft:iron_nugget', 'minecraft:stone_bricks', 'minecraft:iron_nugget'],
        ['minecraft:gold_nugget', 'minecraft:iron_nugget', 'minecraft:gold_nugget']
    ])
    event.shaped(Item.of('kubejs:organ_bundle'), [
        ['', '#forge:string', ''],
        ['', '#forge:leather', ''],
        ['', '#kubejs:stomach', '']
    ])
    
    event.remove({ id: 'toms_storage:storage_terminal' })
    event.shaped(Item.of('toms_storage:ts.storage_terminal'), [
        ['#minecraft:planks', '#forge:ingots/iron', '#minecraft:planks'],
        ['#c:glass_blocks', '#forge:chests/wooden', '#c:glass_blocks'],
        ['#minecraft:planks', '#forge:ingots/iron', '#minecraft:planks']
    ])

    event.remove({ id: 'toms_storage:crafting_terminal' })
    event.shaped(Item.of('toms_storage:ts.crafting_terminal'), [
        ['minecraft:crafting_table', '#forge:storage_blocks/copper', 'minecraft:crafting_table'],
        ['#forge:storage_blocks/copper', 'toms_storage:ts.storage_terminal', '#forge:storage_blocks/copper'],
        ['minecraft:crafting_table', '#forge:storage_blocks/copper', 'minecraft:crafting_table']
    ])

    event.remove({ id: 'compactmachines:wall' })
    event.shaped(Item.of('compactmachines:wall', 8), [
        ['#forge:obsidian', '#forge:obsidian', '#forge:obsidian'],
        ['#forge:obsidian', 'minecraft:ender_eye', '#forge:obsidian'],
        ['#forge:obsidian', '#forge:obsidian', '#forge:obsidian']
    ])
})