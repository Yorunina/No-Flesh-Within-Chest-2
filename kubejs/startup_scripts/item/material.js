// priority: 1000
StartupEvents.registry('item', event => {
    event.create('sawdust').texture('kubejs:item/material/sawdust').maxStackSize(64).burnTime(400)
})

StartupEvents.registry('fluid', event => {
    event.create('mantle_fluid')
        .thickTexture(0x7d0004)
        .bucketColor(0x7d0004)

    event.create('bright_mantle_fluid')
        .thickTexture(0xef5400)
        .bucketColor(0xef5400)

    event.create('dark_mantle_fluid')
        .thickTexture(0x1a0001)
        .bucketColor(0x1a0001)
})