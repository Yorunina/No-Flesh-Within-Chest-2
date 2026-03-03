// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_rose_quartz', 100)],
        [Item.of('create:rose_quartz')], 20 * 10).superheated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_rose_quartz', 100)],
        [Item.of('create:polished_rose_quartz')], 20 * 10).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_rose_quartz', 100)],
        [Item.of('create:electron_tube')], 20 * 10).heated()
    event.recipes.create.mixing(
        [Fluid.of('kubejs:molten_rose_quartz', 100)],
        [Item.of('create:rose_quartz_lamp')], 20 * 10).heated()
    event.recipes.create.filling(
        [Item.of('create:rose_quartz')],
        [Fluid.of('kubejs:molten_rose_quartz', 100), Item.of('minecraft:quartz')], 20 * 3)
})