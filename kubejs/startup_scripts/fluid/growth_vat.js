// priority: 1000
StartupEvents.registry('fluid', event => {
    event.create('nutrients_fluid')
        .bucketColor(0xBCC474)
        .stillTexture('kubejs:block/fluid/nutrients_fluid')
        .flowingTexture('kubejs:block/fluid/nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('rotten_nutrients_fluid')
        .bucketColor(0x69411B)
        .density(6000)
        .viscosity(6000)
        .stillTexture('kubejs:block/fluid/rotten_nutrients_fluid')
        .flowingTexture('kubejs:block/fluid/rotten_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('rose_nutrients_fluid')
        .bucketColor(0xF15872)
        .stillTexture('kubejs:block/fluid/rose_nutrients_fluid')
        .flowingTexture('kubejs:block/fluid/rose_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('molten_rose_quartz')
        .bucketColor(0xFF3F7F)
        .temperature(2000)
        .stillTexture('kubejs:block/fluid/molten_rose_quartz')
        .flowingTexture('kubejs:block/fluid/molten_rose_quartz')

    event.create('primal_nutrients_fluid')
        .bucketColor(0xe271f4)
        .stillTexture('kubejs:block/fluid/primal_nutrients_fluid')
        .flowingTexture('kubejs:block/fluid/primal_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')
})