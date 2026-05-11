// priority: 1000
ServerEvents.recipes(event => {
    event.smelting(Item.of('kubejs:simple_cooked_taste_worm'), Item.of('kubejs:worm_of_taste'), '0.1')
    event.smelting(Item.of('minecraft:iron_nugget', 3), Item.of('kubejs:inner_furnace'), '0.1')
    event.smelting(Item.of('minecraft:iron_nugget', 6), Item.of('kubejs:golem_cable'), '0.1')
    event.smelting(Item.of('minecraft:iron_nugget', 6), Item.of('kubejs:golem_plating'), '0.1')
    event.smelting(Item.of('minecraft:iron_nugget', 1), Item.of('kubejs:piston_muscle'), '0.1')
    event.smelting(Item.of('minecraft:iron_ingot'), Item.of('kubejs:iron_repair_device'), '0.1')
    event.smelting(Item.of('minecraft:magma_block'), Item.of('kubejs:fiery_core'), '0.1')
    event.smelting(Item.of('minecraft:red_dye'), Item.of('kubejs:energy_bottle_red'), '0.1')
    event.smelting(Item.of('minecraft:gold_ingot'), Item.of('kubejs:golden_stone'), '0.1')
})