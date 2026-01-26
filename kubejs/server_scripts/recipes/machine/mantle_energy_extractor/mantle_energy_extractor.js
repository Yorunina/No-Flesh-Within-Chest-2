// priority: 501
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:mantle_energy_extractor', 600)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const block = ctx.getBlock()
            /**@type {Internal.ServerLevel} */
            const level = block.getLevel()
            const pos = block.getPos()
            const depthBar = Math.round(data.getFloat('depth_bar'))
            data.putFloat('depth_bar', depthBar + 0.05)

            return ctx.success()
        })

        .produceItem('kubejs:flame_fragment', 'output_flame')
        .requireSourcePerTick(16)
        .requireSource(500)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const depthBar = Math.round(data.getFloat('depth_bar'))
            if (depthBar > 20) return ctx.error('')
            let crystal = machine.getItemStored('input_crystal')
            if (!crystal || crystal.isEmpty()) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:mantle_energy_extractor', 600)
        .produceItem('kubejs:flame_crystal', 'output_flame')
        .requireSourcePerTick(128)
        .requireSource(1000)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            let crystal = machine.getItemStored('input_crystal')
            if (crystal && !crystal.isEmpty()) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const block = ctx.getBlock()
            /**@type {Internal.ServerLevel} */
            const level = block.getLevel()
            const pos = block.getPos()
            const depthBar = Math.round(data.getFloat('depth_bar'))
            const biomeTemp = level.getBiome(pos).get().getBaseTemperature()
            if (biomeTemp <= -0.5) return ctx.error('')


            return ctx.success()
        })
        .resetOnError()
})


/**
 * 
 * @param {number} baseTemp 
 * @returns {String}
 */
function changeBiome2LowerTemperature(baseTemp, downFall) {
    if (baseTemp >= 2) {
        return 'minecraft:stony_peaks' // 1.0, 0.3
    }
    if (downFall <= 0.5) {
        if (baseTemp > 1) {
            return RandomGet(['minecraft:plains', 'minecraft:sunflower_plains'])
        } else if (baseTemp > 0.5) {
            return RandomGet(['minecraft:stony_shore', 'minecraft:windswept_forest', 'minecraft:windswept_hills'])
        } else if (baseTemp > 0) {
            return 'minecraft:snowy_plains'
        }
    } else {
        if (baseTemp > 1) {
            return RandomGet(['minecraft:forest', 'minecraft:swamp', 'minecraft:birch_forest'])
        } else if (baseTemp > 0.5) {
            return RandomGet(['minecraft:old_growth_spruce_taiga', 'minecraft:old_growth_spruce_taiga', 'minecraft:taiga'])
        } else if (baseTemp > 0) {
            return 'minecraft:snowy_plains'
        }
    }
    return 'minecraft:snowy_taiga' // -0.5
}