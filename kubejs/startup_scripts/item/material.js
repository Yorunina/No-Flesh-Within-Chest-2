// priority: 1000
StartupEvents.registry('item', event => {
    event.create('sawdust').texture('kubejs:item/materials/sawdust').maxStackSize(64).burnTime(400)
    event.create('source_focus_crystal').texture('kubejs:item/materials/source_focus_crystal').maxStackSize(1)
    event.create('exhausted_source_focus_crystal').texture('kubejs:item/materials/exhausted_source_focus_crystal').maxStackSize(1)
    event.create('flame_crystal').texture('kubejs:item/materials/flame_crystal').maxStackSize(64).burnTime(160000)
    event.create('flame_fragment').texture('kubejs:item/materials/flame_fragment').maxStackSize(64).burnTime(16000)
    event.create('free_entropy').texture('kubejs:item/materials/free_entropy').maxStackSize(1)
})