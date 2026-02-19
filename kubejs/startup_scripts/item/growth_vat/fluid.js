// priority: 1000
StartupEvents.registry('fluid', event => {
    event.create('nutrients_fluid')
        .bucketColor(0xBCC474)
        .stillTexture('kubejs:fluid/nutrients_fluid')
        .flowingTexture('kubejs:fluid/nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('rose_nutrients_fluid')
        .bucketColor(0xF15872)
        .stillTexture('kubejs:fluid/rose_nutrients_fluid')
        .flowingTexture('kubejs:fluid/rose_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('iron_nutrients_fluid')
        .bucketColor(0xA6A6A6)
        .stillTexture('kubejs:fluid/iron_nutrients_fluid')
        .flowingTexture('kubejs:fluid/iron_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('copper_nutrients_fluid')
        .bucketColor(0xE47B55)
        .stillTexture('kubejs:fluid/copper_nutrients_fluid')
        .flowingTexture('kubejs:fluid/copper_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('gold_nutrients_fluid')
        .bucketColor(0xE6AF15)
        .stillTexture('kubejs:fluid/gold_nutrients_fluid')
        .flowingTexture('kubejs:fluid/gold_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('zine_nutrients_fluid')
        .bucketColor(0xA3BE9E)
        .stillTexture('kubejs:fluid/zine_nutrients_fluid')
        .flowingTexture('kubejs:fluid/zine_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')

    event.create('netherite_nutrients_fluid')
        .bucketColor(0x7D5F58)
        .stillTexture('kubejs:fluid/netherite_nutrients_fluid')
        .flowingTexture('kubejs:fluid/netherite_nutrients_fluid')
        .tag('kubejs:nutrients_fluid')
})