// priority: 1000
StartupEvents.registry('item', event => {
    event.create('sawdust').texture('kubejs:item/material/sawdust').maxStackSize(64).burnTime(400)
})