// priority: 1000
StartupEvents.registry('fluid', event => {
    event.create('nutrients_fluid')
        .bucketColor(0xBCC474)
        .stillTexture('kubejs:fluid/nutrients_fluid')
        .flowingTexture('kubejs:fluid/nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('rotten_nutrients_fluid')
        .bucketColor(0xAB7500)
        .stillTexture('kubejs:fluid/rotten_nutrients_fluid')
        .flowingTexture('kubejs:fluid/rotten_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('rose_nutrients_fluid')
        .bucketColor(0xF15872)
        .stillTexture('kubejs:fluid/rose_nutrients_fluid')
        .flowingTexture('kubejs:fluid/rose_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    // todo 熔融材质
    event.create('melted_rose_quartz')
        .bucketColor(0xFF3F7F)
        .stillTexture('kubejs:fluid/melted_rose_quartz')
        .flowingTexture('kubejs:fluid/melted_rose_quartz')
})