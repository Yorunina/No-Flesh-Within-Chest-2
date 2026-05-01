// priority: 1000
// 杂项
StartupEvents.registry('item', event => {
    event.create('sawdust').texture('kubejs:item/materials/sawdust').maxStackSize(64).burnTime(400)
    event.create('badge').texture('kubejs:item/materials/badge').maxStackSize(1)
    event.create('inactivated_neuron_tumor').texture('kubejs:item/materials/inactivated_neuron_tumor').maxStackSize(1)

    event.create('dimension_shards').texture('kubejs:item/materials/dimension_shards').maxStackSize(1)
})