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
    event.remove({ id: 'mirror_mirror_forge:mirror_recipe' })
    event.shaped(Item.of('mirror_mirror_forge:mirror'), [
        ['', 'minecraft:iron_ingot', ''],
        ['minecraft:iron_ingot', 'minecraft:light_blue_stained_glass', 'minecraft:iron_ingot'],
        ['', 'minecraft:iron_ingot', '']
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
})