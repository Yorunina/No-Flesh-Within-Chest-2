// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.mixing(
        [Fluid.of('kubejs:nutrients_fluid', 250)],
        [Item.of('biomancy:nutrient_paste', 4), Fluid.of('minecraft:water', 250)], 20 * 15).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:nutrients_fluid', 1000)],
        [Item.of('biomancy:nutrient_paste', 4), Fluid.of('create:honey', 250)], 20 * 8).heated()
    event.recipes.tconstruct.melting(Fluid.of('kubejs:nutrients_fluid', 50), Item.of('biomancy:nutrient_paste'), 600, 600)
    event.recipes.tconstruct.melting(Fluid.of('kubejs:nutrients_fluid', 450), Item.of('biomancy:nutrient_bar'), 800, 1800)
    event.recipes.tconstruct.casting_table('biomancy:nutrient_paste', Fluid.of('kubejs:nutrients_fluid', 50), 47)


    event.recipes.create.mixing(
        [Fluid.of('kubejs:rotten_nutrients_fluid', 250)],
        [Item.of('minecraft:rotten_flesh', 8), Fluid.of('minecraft:water', 250)], 20 * 15).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:rotten_nutrients_fluid', 1000)],
        [Item.of('minecraft:rotten_flesh', 4), Fluid.of('create:honey', 250)], 20 * 8).heated()
    event.recipes.tconstruct.alloy(Fluid.of('kubejs:rotten_nutrients_fluid', 500), [Fluid.of('kubejs:nutrients_fluid', 500), Fluid.of('tconstruct:meat_soup', 500)], 800)

    event.recipes.create.mixing(
        [Fluid.of('kubejs:rose_nutrients_fluid', 250)],
        [Item.of('create:rose_quartz', 4), Fluid.of('minecraft:water', 250)], 20 * 15).superheated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:rose_nutrients_fluid', 250)],
        [Item.of('create:polished_rose_quartz', 4), Fluid.of('minecraft:water', 250)], 20 * 15).superheated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:rose_nutrients_fluid', 1000)],
        [Item.of('create:rose_quartz', 4), Fluid.of('create:honey', 250)], 20 * 8).superheated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:rose_nutrients_fluid', 1000)],
        [Item.of('create:polished_rose_quartz', 4), Fluid.of('create:honey', 250)], 20 * 8).superheated()
    event.recipes.tconstruct.alloy(Fluid.of('kubejs:rose_nutrients_fluid', 500), [Fluid.of('kubejs:nutrients_fluid', 500), Fluid.of('kubejs:melted_rose_quartz', 250)], 1500)
})