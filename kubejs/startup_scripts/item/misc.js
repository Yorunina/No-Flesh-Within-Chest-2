// priority: 1000
// 杂项
StartupEvents.registry('item', event => {
    event.create('kubejs:sawdust').texture('kubejs:item/materials/sawdust').maxStackSize(64).burnTime(400)
    event.create('kubejs:badge').texture('kubejs:item/materials/badge').maxStackSize(1)
    event.create('kubejs:inactivated_neuron_tumor').texture('kubejs:item/materials/inactivated_neuron_tumor').maxStackSize(1)
    event.create('kubejs:dimensional_worm').texture('kubejs:item/materials/dimensional_worm').maxStackSize(1)
    event.create('kubejs:rainbow_compound').texture('kubejs:item/materials/rainbow_compound').maxStackSize(64)
    event.create('kubejs:blood_crystal').texture('kubejs:item/materials/blood_crystal').maxStackSize(64)

    event.create('kubejs:relic_paper').texture('kubejs:item/materials/relic_paper').maxStackSize(64)
    event.create('kubejs:relic_metal').texture('kubejs:item/materials/relic_metal').maxStackSize(64)
    event.create('kubejs:relic_gem').texture('kubejs:item/materials/relic_gem').maxStackSize(64)
})