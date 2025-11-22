// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.mixing([Item.of('create:cinder_flour', 3)], [Item.of('supplementaries:ash'), Item.of('minecraft:redstone')], 100).heated()
    event.recipes.create.mixing('kubejs:refined_brass_ingot', ['#forge:ingots/brass', Fluid.of('createdieselgenerators:ethanol', 200)], 2400).superheated()
})
