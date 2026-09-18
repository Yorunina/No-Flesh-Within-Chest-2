// priority: 1000
StartupEvents.registry('item', event => {
    for (let tier = 0; tier <= 4; tier++) {
        event.create(`kubejs:omni_material_${tier}`)
            .texture('kubejs:item/materials/omni_material')
            .maxStackSize(64)
    }
})
