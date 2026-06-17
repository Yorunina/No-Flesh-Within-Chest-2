// priority: 501
const MantleEnergyExtractorMaxDepth = 10000
ServerEvents.recipes(event => {
    // 低深度默认配方
    event.recipes.custommachinery.custom_machine('kubejs:mantle_energy_extractor', 600)
        .produceItem('kubejs:flame_fragment', 'output_flame')
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const depthBar = data.getInt('depth_bar')
            data.putInt('depth_bar', Math.min(depthBar + 1, MantleEnergyExtractorMaxDepth))
            const outputExtract = machine.getItemStored('output_extract')
            const inputTarget = machine.getItemStored('input_target')
            if (!validMantleInputTarget(inputTarget, depthBar)) return ctx.success()
            let outputItem = inputTarget.withCount(1)
            if (!outputExtract || outputExtract.isEmpty()) {
                machine.setItemStored('output_extract', outputItem)
            } else if (outputExtract.is(outputItem) && outputExtract.getCount() < outputItem.getMaxStackSize()) {
                machine.setItemStored('output_extract', outputItem.withCount(Math.min(outputExtract.getCount() + 1, outputItem.getMaxStackSize())))
            }
            return ctx.success()
        })
        .requireSourcePerTick(8)
        .requireSource(250)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const block = ctx.getBlock()
            /**@type {Internal.ServerLevel} */
            const level = block.getLevel()
            const server = level.getServer()
            if (HadUnderEternalWinter(server)) return ctx.error('')
            let inputTarget = machine.getItemStored('input_target')
            if (inputTarget.is('kubejs:flame_crystal')) {
                return ctx.error('')
            }
            const pos = block.getPos()
            const biome = level.getBiome(pos).get()
            const biomeTemp = biome.getTemperature(pos)
            if (biomeTemp <= -0.5) return ctx.error('')
            const depthBar = Math.round(data.getFloat('depth_bar'))
            if (depthBar >= 2000) return ctx.error('')
            let crystal = machine.getItemStored('input_crystal')
            if (!crystal || crystal.isEmpty()) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .resetOnError()

    // 高深度钻取配方
    event.recipes.custommachinery.custom_machine('kubejs:mantle_energy_extractor', 1200)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let crystal = machine.getItemStored('input_crystal')
            if (!crystal || !crystal.is('kubejs:source_focus_crystal')) return ctx.error('')
            const data = machine.getData()
            const block = ctx.getBlock()
            /**@type {Internal.ServerLevel} */
            const level = block.getLevel()
            const server = level.getServer()
            const pos = block.getPos()
            const depthBar = Math.round(data.getFloat('depth_bar'))
            data.putInt('depth_bar', Math.min(depthBar + 200, MantleEnergyExtractorMaxDepth))
            if (Math.random() < 0.1) {
                machine.setItemStored('input_crystal', 'kubejs:exhausted_source_focus_crystal')
            }
            const biome = level.getBiome(pos).get()
            const biomeTemp = biome.getBaseTemperature()
            if (biomeTemp <= -0.5) return ctx.success()

            const outputExtract = machine.getItemStored('output_extract')
            const inputTarget = machine.getItemStored('input_target')
            if (!validMantleInputTarget(inputTarget, depthBar)) return ctx.success()
            let outputItem = inputTarget.withCount(inputTarget.getMaxStackSize())
            if (!outputExtract || outputExtract.isEmpty() || outputExtract.is(outputItem)) {
                machine.setItemStored('output_extract', outputItem)
            }

            if (Math.random() < depthBar / MantleEnergyExtractorMaxDepth) {
                let targetBiome = getBiome2LowerTemperature(biomeTemp)
                SetBiomeByPosChunk(level, pos, targetBiome)
                IncreaseEternalWinterCounter(server, 2)
            }
            return ctx.success()
        })
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const block = ctx.getBlock()
            /**@type {Internal.ServerLevel} */
            const level = block.getLevel()
            const server = level.getServer()
            if (HadUnderEternalWinter(server)) return ctx.error('')
            let inputTarget = machine.getItemStored('input_target')
            if (inputTarget.is('kubejs:flame_crystal')) {
                return ctx.error('')
            }

            const pos = block.getPos()
            const biome = level.getBiome(pos).get()
            const biomeTemp = biome.getTemperature(pos)
            if (biomeTemp <= -0.5) return ctx.error('')

            let crystal = machine.getItemStored('input_crystal')
            if (crystal && crystal.is('kubejs:source_focus_crystal')) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .produceItem('kubejs:flame_crystal', 'output_flame')
        .requireSourcePerTick(16)
        .requireSource(1000)
        .resetOnError()

    // 深钻配方
    event.recipes.custommachinery.custom_machine('kubejs:mantle_energy_extractor', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const block = ctx.getBlock()
            /**@type {Internal.ServerLevel} */
            const level = block.getLevel()

            const pos = block.getPos()
            const biome = level.getBiome(pos).get()
            const biomeTemp = biome.getTemperature(pos)
            if (biomeTemp <= -0.5) return ctx.error('')

            let crystal = machine.getItemStored('input_crystal')
            if (crystal && crystal.is('kubejs:source_focus_crystal')) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const block = ctx.getBlock()
            /**@type {Internal.ServerLevel} */
            const level = block.getLevel()
            const server = level.getServer()
            if (HadUnderEternalWinter(server)) return ctx.error('')
            const data = machine.getData()
            let crystal = machine.getItemStored('input_crystal')
            if (!crystal || !crystal.is('kubejs:source_focus_crystal')) return ctx.error('')
            if (Math.random() < 0.1) {
                machine.setItemStored('input_crystal', 'kubejs:exhausted_source_focus_crystal')
            }
            const pos = block.getPos()
            const biome = level.getBiome(pos).get()
            const biomeTemp = biome.getBaseTemperature()
            if (biomeTemp <= -0.5) return ctx.success()
            const depthBar = Math.max(data.getInt('depth_bar'), 200)
            if (Math.random() < depthBar / MantleEnergyExtractorMaxDepth * 3) {
                let targetBiome = getBiome2LowerTemperature(biomeTemp)
                SetBiomeByPosChunk(level, pos, targetBiome)
            }
            IncreaseEternalWinterCounter(server, 5)
            data.putInt('depth_bar', Math.min(depthBar * 2, MantleEnergyExtractorMaxDepth))

            return ctx.success()
        })
        .requireItem('kubejs:flame_crystal', 'input_target')
        .requireSourcePerTick(8)
        .requireSource(1000)
        .resetOnError()
})

/**
 * 
 * @param {Internal.ItemStack} input 
 * @param {number} depth 
 */
function validMantleInputTarget(input, depth) {
    // 禁用容器复制
    if (input.hasTag('minecraft:bundles') || input.hasTag('minecraft:shulker_boxes')) return false
    if (input.hasTag('forge:raw_materials')) return true
    if (depth < 200) return false
    if (input.hasTag('forge:gems')) return true
    if (depth < 500) return false
    if (input.hasTag('minecraft:flowers')) return true
    if (depth < 1000) return false
    if (input.isEdible()) return true
    if (depth < 2000) return false
    if (input.hasTag('forge:books')) return true
    if (depth < 3000) return false
    if (String(input.id) == 'minecraft:potion') return true
    if (depth < 5000) return false
    if (input.getMod() == 'minecraft') return true
    if (depth < 7500) return false
    if (TetraJSUtils.isModularItem(input.getItem())) return true
    return false
}


/**
 * 
 * @param {number} baseTemp 
 * @returns {String}
 */
function getBiome2LowerTemperature(baseTemp) {
    if (baseTemp >= 2) {
        return 'minecraft:stony_peaks' // 1.0, 0.3
    }
    if (baseTemp >= 1) {
        return ['minecraft:forest', 'minecraft:swamp', 'minecraft:birch_forest', 'minecraft:plains']
    } else if (baseTemp >= 0.5) {
        return RandomGet(['minecraft:stony_shore', 'minecraft:windswept_forest', 'minecraft:windswept_hills', 'minecraft:old_growth_spruce_taiga', 'minecraft:old_growth_spruce_taiga', 'minecraft:taiga'])
    } else if (baseTemp > 0) {
        return 'minecraft:snowy_plains'
    }
    return 'minecraft:snowy_taiga' // -0.5
}