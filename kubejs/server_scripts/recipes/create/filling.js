// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.filling([Item.of('tetra:thermal_cell', 1)], [Item.of('tetra:thermal_cell', '{Damage:128}').weakNBT(), Fluid.of('minecraft:lava', 1000)])

    event.recipes.create.filling([Item.of('minecraft:green_dye', 1)], [Item.of('minecraft:cyan_dye'), Fluid.of('biomancy:acid', 1)])
    event.recipes.create.filling([Item.of('minecraft:blue_dye', 1)], [Item.of('minecraft:cyan_dye'), Fluid.of('minecraft:water', 1)])

    event.recipes.create.filling([Item.of('minecraft:red_dye', 1)], [Item.of('minecraft:purple_dye'), Fluid.of('minecraft:lava', 1)])
    event.recipes.create.filling([Item.of('minecraft:blue_dye', 1)], [Item.of('minecraft:purple_dye'), Fluid.of('minecraft:water', 1)])

    event.recipes.create.filling([Item.of('minecraft:red_dye', 1)], [Item.of('minecraft:orange_dye'), Fluid.of('minecraft:lava', 1)])
    event.recipes.create.filling([Item.of('minecraft:yellow_dye', 1)], [Item.of('minecraft:orange_dye'), Fluid.of('create:honey', 1)])

    event.recipes.create.filling([Item.of('minecraft:green_dye', 1)], [Item.of('minecraft:yellow_dye'), Fluid.of('biomancy:acid', 1)])
    event.recipes.create.filling([Item.of('minecraft:red_dye', 1)], [Item.of('minecraft:yellow_dye'), Fluid.of('minecraft:lava', 1)])

    event.recipes.create.filling([Item.of('biomancy:breeding_stimulant', 1)], [Item.of('biomancy:vial'), Fluid.of('kubejs:neuroexcitatory_hormone_fluid', 250)])
    event.recipes.create.filling([Item.of('biomancy:ageing_serum', 1)], [Item.of('biomancy:vial'), Fluid.of('kubejs:ageing_fluid', 250)])
    event.recipes.create.filling([Item.of('biomancy:rejuvenation_serum', 1)], [Item.of('biomancy:vial'), Fluid.of('kubejs:rejuvenation_fluid', 250)])
    event.recipes.create.filling([Item.of('biomancy:cleansing_serum', 1)], [Item.of('biomancy:vial'), Fluid.of('minecraft:milk', 250)])
    
})

