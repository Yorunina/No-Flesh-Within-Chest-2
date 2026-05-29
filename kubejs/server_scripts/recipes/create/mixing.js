// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.mixing([Item.of('create:cinder_flour', 3)], [Item.of('supplementaries:ash'), Item.of('minecraft:redstone')], 100).heated()
    event.recipes.create.mixing('kubejs:refined_brass_ingot', ['#forge:ingots/brass', Fluid.of('createdieselgenerators:ethanol', 200)], 2400).superheated()

    event.recipes.create.mixing(
        [Item.of('kubejs:mantle_ore').withChance(0.8), Item.of('minecraft:iron_ingot').withChance(0.5), Item.of('minecraft:crying_obsidian').withChance(0.5), Item.of('kubejs:unstable_matter').withChance(0.99)],
        [Item.of('kubejs:mantle_ore'), Item.of('kubejs:unstable_matter'), Fluid.of('createdieselgenerators:ethanol', 75)], 20 * 30).superheated()

    event.recipes.create.mixing(
        [Item.of('minecraft:amethyst_shard'), Item.of('minecraft:obsidian')],
        [Item.of('kubejs:unstable_matter'), Item.of('minecraft:crying_obsidian')], 20 * 5)

    event.recipes.create.mixing(
        [Item.of('minecraft:crying_obsidian')],
        [Item.of('minecraft:obsidian'), Item.of('kubejs:unstable_matter')], 20 * 5)

    event.recipes.create.mixing(
        [Item.of('graveyard:dark_iron_ingot')],
        [Item.of('minecraft:amethyst_shard'), Item.of('minecraft:obsidian')], 20 * 5)

    event.recipes.create.mixing(
        [Item.of('minecraft:iron_ingot')],
        [Item.of('graveyard:dark_iron_ingot'), Fluid.of('createdieselgenerators:ethanol', 25)], 20 * 5)

    event.recipes.create.mixing(
        [Item.of('kubejs:circuit_board', 7), Fluid.of('create:potion', 80, { Bottle: "REGULAR", Potion: "minecraft:fire_resistance" })],
        [Item.of('kubejs:counterweight_gear'), Item.of('kubejs:structural_bolt'), Item.of('create:brass_block'), Fluid.of('create:potion', 80, { Bottle: "REGULAR", Potion: "minecraft:water_breathing" })], 20 * 56).superheated()

    event.recipes.create.mixing(
        [Item.of('kubejs:data_bus', 1), Fluid.of('create:potion', 70, { Bottle: "REGULAR", Potion: "minecraft:night_vision" })],
        [Item.of('kubejs:random_tick_spring'), Item.of('kubejs:circuit_board'), Fluid.of('create:potion', 70, { Bottle: "REGULAR", Potion: "minecraft:fire_resistance" })], 20 * 8).superheated()

    event.recipes.create.mixing(
        [Item.of('kubejs:buffer_circuit', 1), Fluid.of('create:potion', 140, { Bottle: "REGULAR", Potion: "minecraft:regeneration" })],
        [Item.of('kubejs:amethyst_resonator'), Item.of('kubejs:circuit_board'), Fluid.of('create:potion', 140, { Bottle: "REGULAR", Potion: "minecraft:night_vision" })], 20 * 8).superheated()

    event.recipes.create.mixing(
        [Item.of('kubejs:timing_module', 1), Fluid.of('create:potion', 280, { Bottle: "REGULAR", Potion: "minecraft:leaping" })],
        [Item.of('kubejs:timing_valve'), Item.of('kubejs:circuit_board'), Fluid.of('create:potion', 280, { Bottle: "REGULAR", Potion: "minecraft:regeneration" })], 20 * 8).superheated()

    event.recipes.create.mixing(
        [Item.of('kubejs:spatial_stabilizer', 1), Fluid.of('create:potion', 280, { Bottle: "REGULAR", Potion: "minecraft:poison" })],
        [Item.of('kubejs:simulated_unit'), Item.of('kubejs:circuit_board'), Fluid.of('create:potion', 280, { Bottle: "REGULAR", Potion: "minecraft:leaping" })], 20 * 8).superheated()

    event.recipes.create.mixing(
        [Item.of('kubejs:oracle_module', 1), Fluid.of('create:potion', 560, { Bottle: "REGULAR", Potion: "minecraft:water_breathing" })],
        [Item.of('kubejs:oracle_gate'), Item.of('kubejs:circuit_board'), Fluid.of('create:potion', 560, { Bottle: "REGULAR", Potion: "minecraft:poison" })], 20 * 8).superheated()

    event.recipes.create.mixing(
        [Item.of('create:chromatic_compound', 4)],
        ['#forge:ingots/iron', '#forge:ingots/copper', '#forge:ingots/gold', '#forge:ingots/zinc', '#forge:gems/emerald', '#forge:dusts/redstone'], 20 * 20).superheated()

    event.recipes.create.mixing(
        ['kubejs:colorful_dye'],
        ['kubejs:colorful_slime_ball', 'minecraft:red_dye', 'minecraft:green_dye', 'minecraft:blue_dye'], 20 * 20).superheated()

    event.recipes.create.mixing(
        ['kubejs:flame_fragment'],
        [Fluid.of('minecraft:lava', 1000), 'minecraft:obsidian'], 20 * 10).superheated()
})