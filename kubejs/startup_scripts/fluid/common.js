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

    event.create('blood_fluid')
        .bucketColor(0xC3403E)
        .stillTexture('kubejs:block/fluid/blood_fluid')
        .flowingTexture('kubejs:block/fluid/blood_fluid')

    event.create('blood_fat_fluid')
        .bucketColor(0xC3403E)
        .stillTexture('kubejs:block/fluid/blood_fat_fluid')
        .flowingTexture('kubejs:block/fluid/blood_fat_fluid')

    event.create('neuroexcitatory_hormone_fluid')
        .bucketColor(0xC3403E)
        .stillTexture('kubejs:block/fluid/neuroexcitatory_hormone_fluid')
        .flowingTexture('kubejs:block/fluid/neuroexcitatory_hormone_fluid')

    event.create('rejuvenation_fluid')
        .bucketColor(0xC3403E)
        .stillTexture('kubejs:block/fluid/rejuvenation_fluid')
        .flowingTexture('kubejs:block/fluid/rejuvenation_fluid')

    event.create('ageing_fluid')
        .bucketColor(0xC3403E)
        .stillTexture('kubejs:block/fluid/ageing_fluid')
        .flowingTexture('kubejs:block/fluid/ageing_fluid')
})