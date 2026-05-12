// priority: 1000
// 杂项
StartupEvents.registry('item', event => {
    event.create('kubejs:sawdust').texture('kubejs:item/materials/sawdust').maxStackSize(64).burnTime(400)
    event.create('kubejs:badge').texture('kubejs:item/materials/badge').maxStackSize(1)
    event.create('kubejs:inactivated_neuron_tumor').texture('kubejs:item/materials/inactivated_neuron_tumor').maxStackSize(1)
    event.create('kubejs:dimension_shards').texture('kubejs:item/materials/dimension_shards').maxStackSize(1)
    event.create('kubejs:dimensional_worm').texture('kubejs:item/materials/dimensional_worm').maxStackSize(1)
})