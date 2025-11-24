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

})
