// priority: 1000
StartupEvents.registry('fluid', event => {
    event.create('molten_emerald_fluid')
        .bucketColor(0x50C878)
        .temperature(2000)
        .stillTexture('kubejs:block/fluid/molten_emerald_fluid')
        .flowingTexture('kubejs:block/fluid/molten_emerald_fluid')

    event.create('molten_copper_fluid')
        .bucketColor(0xC05630)
        .temperature(2000)
        .stillTexture('kubejs:block/fluid/molten_copper_fluid')
        .flowingTexture('kubejs:block/fluid/molten_copper_fluid')

    event.create('molten_diamond_fluid')
        .bucketColor(0x7DF4E9)
        .temperature(2000)
        .stillTexture('kubejs:block/fluid/molten_diamond_fluid')
        .flowingTexture('kubejs:block/fluid/molten_diamond_fluid')

    event.create('molten_gold_fluid')
        .bucketColor(0xFFED55)
        .temperature(2000)
        .stillTexture('kubejs:block/fluid/molten_gold_fluid')
        .flowingTexture('kubejs:block/fluid/molten_gold_fluid')

    event.create('molten_iron_fluid')
        .bucketColor(0x921B0F)
        .temperature(2000)
        .stillTexture('kubejs:block/fluid/molten_iron_fluid')
        .flowingTexture('kubejs:block/fluid/molten_iron_fluid')
})