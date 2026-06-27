// priority: 1000
ServerEvents.recipes(event => {
    /** 金 */
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_gold_fluid', 90)],
        [Item.of('minecraft:gold_ingot'), Fluid.of('minecraft:lava', 90)], 20 * 10).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_gold_fluid', 810)],
        [Item.of('minecraft:gold_block'), Fluid.of('minecraft:lava', 810)], 20 * 90).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_gold_fluid', 10)],
        [Item.of('minecraft:gold_nugget'), Fluid.of('minecraft:lava', 10)], 20 * 1).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_gold_fluid', 90)],
        [Item.of('create:crushed_raw_gold')], 20 * 10).superheated()
    event.recipes.createdieselgenerators.compression_molding(
        [Item.of('minecraft:gold_ingot')],
        [Fluid.of('kubejs:molten_gold_fluid', 90)], 'createdieselgenerators:bar')

    /** 铁 */
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_iron_fluid', 90)],
        [Item.of('minecraft:iron_ingot'), Fluid.of('minecraft:lava', 90)], 20 * 10).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_iron_fluid', 810)],
        [Item.of('minecraft:iron_block'), Fluid.of('minecraft:lava', 810)], 20 * 90).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_iron_fluid', 10)],
        [Item.of('minecraft:iron_nugget'), Fluid.of('minecraft:lava', 10)], 20 * 1).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_iron_fluid', 90)],
        [Item.of('create:crushed_raw_iron')], 20 * 10).superheated()
    event.recipes.createdieselgenerators.compression_molding(
        [Item.of('minecraft:iron_ingot')],
        [Fluid.of('kubejs:molten_iron_fluid', 90)], 'createdieselgenerators:bar')

    /** 铜 */
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_copper_fluid', 90)],
        [Item.of('minecraft:copper_ingot'), Fluid.of('minecraft:lava', 90)], 20 * 10).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_copper_fluid', 810)],
        [Item.of('minecraft:copper_block'), Fluid.of('minecraft:lava', 810)], 20 * 90).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_copper_fluid', 10)],
        [Item.of('minecraft:copper_nugget'), Fluid.of('minecraft:lava', 10)], 20 * 1).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_copper_fluid', 90)],
        [Item.of('create:crushed_raw_copper')], 20 * 10).superheated()
    event.recipes.createdieselgenerators.compression_molding(
        [Item.of('minecraft:copper_ingot')],
        [Fluid.of('kubejs:molten_copper_fluid', 90)], 'createdieselgenerators:bar')

    /** 钻石 */
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_diamond_fluid', 90)],
        [Item.of('minecraft:diamond'), Fluid.of('minecraft:lava', 90)], 20 * 10).superheated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_diamond_fluid', 810)],
        [Item.of('minecraft:diamond_block'), Fluid.of('minecraft:lava', 810)], 20 * 90).superheated()
    event.recipes.createdieselgenerators.compression_molding(
        [Item.of('minecraft:diamond')],
        [Fluid.of('kubejs:molten_diamond_fluid', 90)], 'createdieselgenerators:bar')

    /** 绿宝石 */
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_emerald_fluid', 100)],
        [Item.of('minecraft:emerald'), Fluid.of('minecraft:lava', 100)], 20 * 10).superheated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_emerald_fluid', 900)],
        [Item.of('minecraft:emerald_block'), Fluid.of('minecraft:lava', 900)], 20 * 90).superheated()
    event.recipes.createdieselgenerators.compression_molding(
        [Item.of('minecraft:emerald')],
        [Fluid.of('kubejs:molten_emerald_fluid', 100)], 'createdieselgenerators:bar')

    /** 血晶 */
    event.recipes.create.mixing(
        [Fluid.of('kubejs:blood_fluid', 500)],
        [Item.of('kubejs:blood_crystal')], 20 * 10).heated()
    event.recipes.createdieselgenerators.compression_molding(
        [Item.of('kubejs:blood_crystal')],
        [Fluid.of('kubejs:blood_fluid', 500)], 'createdieselgenerators:bar')
})