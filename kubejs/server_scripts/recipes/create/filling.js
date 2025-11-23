// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.mixing(
        [Item.of('kubejs:mantle_ore').withChance(0.8), Item.of('minecraft:crying_obsidian').withChance(0.5), Item.of('kubejs:unstable_matter').withChance(0.99)],
        [Item.of('kubejs:mantle_ore'), Item.of('kubejs:unstable_matter'), Fluid.of('createdieselgenerators:ethanol', 200)], 20 * 30).superheated()
})