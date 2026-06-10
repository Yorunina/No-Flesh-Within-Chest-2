// priority: 500
const WorldComputerMachineStructure = [["AAAAA", "ACCCA", "ACCCA", "ACCCA", "AAAAA"], ["ABBBA", "BFEFB", "BELEB", "BDKOB", "ABmBA"], ["ABBBA", "BH HB", "B N B", "BHMHB", "ABBBA"], ["ABBBA", "BIIIB", "BILIB", "BIIIB", "ABBBA"], ["AAAAA", "ABBBA", "ABBBA", "ABBBA", "AAAAA"]]
const WorldComputerMachineStructureMapping = { "F": "kubejs:computing_core", "I": "kubejs:world_renderer", "M": "biomancy:impermeable_membrane", "B": "createprism:brass_glass_casing", "A": "create:brass_casing", "H": "create_connected:kinetic_battery", "O": "kubejs:entity_simulator", "C": "kubejs:data_compressor", "K": "biomancy:flesh", "L": "kubejs:cerebral_brain_processor", "N": "create_power_loader:brass_chunk_loader", "D": "kubejs:quantum_dimension_resolver", "E": "kubejs:void_diffraction_vault" }
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionOnStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            data.putInt('resource_bar', 512)
            return ctx.success()
        })
        .requireFunctionEachTick(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let resourceBar = data.getInt('resource_bar')
            let ccItem = machine.getItemStored('input_2')
            if (ccItem.is('create:chromatic_compound')) {
                let ccCount = ccItem ? ccItem.getCount() : 0
                data.putInt('resource_bar', Math.min(resourceBar + ccCount * 512, 1000000))
                machine.setItemStored('input_2', Item.empty)
            }
            return ctx.success()
        })
        .requireSU(128)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let resourceBar = data.getInt('resource_bar')
            data.putInt('resource_bar', 0)
            if (Math.random() < Math.pow(resourceBar / 1000000, 2)) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('create:chromatic_compound'), 'input_2')
        .requireItem(Item.of('kubejs:circuit_board'), 'input_1')
        .produceItem(Item.of('kubejs:world_renderer', 1), 'output_1')
        .resetOnError()


    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionOnStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            data.putInt('resource_bar', 1024)
            return ctx.success()
        })
        .requireFunctionEachTick(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let needUpdate = false
            let resourceBar = data.getInt('resource_bar')
            let ccItem = machine.getItemStored('input_2')
            if (ccItem.is('create:chromatic_compound')) {
                let ccCount = ccItem ? ccItem.getCount() : 0
                resourceBar = resourceBar + ccCount * 1024
                machine.setItemStored('input_2', Item.empty)
                needUpdate = true
            }
            if (ctx.remainingTime % 20 == 0) {
                resourceBar = Math.floor(resourceBar * 0.98)
                needUpdate = true
            }
            if (needUpdate) {
                data.putInt('resource_bar', Math.min(resourceBar, 1000000))
            }
            return ctx.success()
        })
        .requireSU(128)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let resourceBar = data.getInt('resource_bar')
            data.putInt('resource_bar', 0)
            if (Math.random() < Math.pow(resourceBar / 1000000, 2)) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('create:chromatic_compound'), 'input_2')
        .requireItem(Item.of('kubejs:data_bus'), 'input_1')
        .produceItem(Item.of('kubejs:data_compressor', 1), 'output_1')
        .resetOnError()


    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionOnStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            data.putInt('resource_bar', 8192)
            return ctx.success()
        })
        .requireFunctionEachTick(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let needUpdate = false
            let resourceBar = data.getInt('resource_bar')
            let ccItem = machine.getItemStored('input_2')
            if (ccItem.is('create:chromatic_compound')) {
                let ccCount = ccItem ? ccItem.getCount() : 0
                resourceBar = resourceBar + ccCount * 512
                machine.setItemStored('input_2', Item.empty)
                needUpdate = true
            }
            if (ctx.remainingTime % 20 == 0) {
                resourceBar = Math.floor(resourceBar - 1024)
                if (resourceBar <= 0) {
                    data.putInt('resource_bar', 0)
                    return ctx.error('')
                }
                needUpdate = true
            }
            if (needUpdate) {
                data.putInt('resource_bar', Math.min(resourceBar, 1000000))
            }
            return ctx.success()
        })
        .requireSU(128)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let resourceBar = data.getInt('resource_bar')
            data.putInt('resource_bar', 0)
            if (Math.random() < Math.pow(resourceBar / 1000000, 2)) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('create:chromatic_compound', 16), 'input_2')
        .requireItem(Item.of('biomancy:flesh'), 'input_1')
        .produceItem(Item.of('kubejs:cerebral_brain_processor', 1), 'output_1')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionEachTick(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            let needUpdate = false
            let resourceBar = data.getInt('resource_bar')
            let ccItem = machine.getItemStored('input_2')
            if (ccItem.is('create:chromatic_compound')) {
                let ccCount = ccItem ? ccItem.getCount() : 0
                resourceBar = resourceBar + ccCount * 1024
                machine.setItemStored('input_2', Item.empty)
                needUpdate = true
            }
            if (ctx.remainingTime % 20 == 0) {
                resourceBar = Math.floor(resourceBar * 0.99)
                needUpdate = true
            }
            if (needUpdate) {
                data.putInt('resource_bar', Math.min(resourceBar, 1000000))
                tile.setPowerLevel(Math.floor(resourceBar / 1000000 * 16))
                level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            }
            return ctx.success()
        })
        .requireFunctionOnStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            tile.setPowerLevel(0)
            level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            data.putInt('resource_bar', 1024)
            return ctx.success()
        })
        .requireSU(128)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            let resourceBar = data.getInt('resource_bar')
            data.putInt('resource_bar', 0)
            tile.setPowerLevel(0)
            level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            if (Math.random() < Math.pow((resourceBar > 500000) ? (2 - resourceBar / 500000) : (resourceBar / 500000), 2)) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('create:chromatic_compound'), 'input_2')
        .requireItem(Item.of('createprism:brass_glass_casing'), 'input_1')
        .produceItem(Item.of('kubejs:void_diffraction_vault', 1), 'output_1')
        .resetOnError()


    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionEachTick(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            let needUpdate = false
            let resourceBar = data.getInt('resource_bar')
            let ccItem = machine.getItemStored('input_2')
            if (ccItem.is('create:chromatic_compound')) {
                let ccCount = ccItem ? ccItem.getCount() : 0
                resourceBar = resourceBar + ccCount * 2048
                machine.setItemStored('input_2', Item.empty)
                needUpdate = true
            }
            if (ctx.remainingTime % 20 == 0) {
                resourceBar = Math.floor(resourceBar * 0.99)
                needUpdate = true
            }
            if (needUpdate) {
                let targetResource = data.getInt('target_resource')
                data.putInt('resource_bar', Math.min(resourceBar, 1000000))
                tile.setPowerLevel(Math.floor(Math.abs((resourceBar - targetResource)) / 1000000 * 16))
                level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            }
            return ctx.success()
        })
        .requireFunctionOnStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            tile.setPowerLevel(0)
            level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            data.putInt('resource_bar', 2048)
            data.putInt('target_resource', Math.floor(Math.random() * 1000000))
            return ctx.success()
        })
        .requireSU(128)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            let resourceBar = data.getInt('resource_bar')
            data.putInt('resource_bar', 0)
            tile.setPowerLevel(0)
            level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            let targetResource = data.getInt('target_resource')
            if (Math.random() < Math.pow((resourceBar > targetResource) ? (1000000 - resourceBar) / (1000000 - targetResource) : (resourceBar / targetResource), 2)) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('create:chromatic_compound'), 'input_2')
        .requireItem(Item.of('kubejs:timing_module'), 'input_1')
        .produceItem(Item.of('kubejs:computing_core', 1), 'output_1')
        .resetOnError()


    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionEachTick(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            let needUpdate = false
            let resourceBar = data.getInt('resource_bar')
            let ccItem = machine.getItemStored('input_2')
            if (ccItem.is('create:chromatic_compound')) {
                let ccCount = ccItem ? ccItem.getCount() : 0
                resourceBar = resourceBar + ccCount * 2048
                machine.setItemStored('input_2', Item.empty)
                needUpdate = true
            }
            if (ctx.remainingTime % 20 == 0) {
                resourceBar = Math.floor(resourceBar * 0.99)
                needUpdate = true
            }
            if (ctx.remainingTime % 600 == 0 && ctx.remainingTime != 3600) {
                let targetResource = data.getInt('target_resource')
                if (Math.abs(targetResource - resourceBar) > 150000) {
                    data.putInt('resource_bar', 0)
                    tile.setPowerLevel(0)
                    level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
                    return ctx.error('')
                }
                data.putInt('target_resource', targetResource + Math.floor(Math.random() * 300000) - 150000)
                needUpdate = true
            }
            if (needUpdate) {
                let targetResource = data.getInt('target_resource')
                data.putInt('resource_bar', Math.min(resourceBar, 1000000))
                tile.setPowerLevel(Math.floor(Math.abs((resourceBar - targetResource)) / 1000000 * 16))
                level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            }
            return ctx.success()
        })
        .requireFunctionOnStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            tile.setPowerLevel(0)
            level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            data.putInt('resource_bar', 2048)
            data.putInt('target_resource', Math.floor(Math.random() * 1000000))
            return ctx.success()
        })
        .requireSU(128)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            let resourceBar = data.getInt('resource_bar')
            data.putInt('resource_bar', 0)
            tile.setPowerLevel(0)
            level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            let targetResource = data.getInt('target_resource')
            if (Math.random() < Math.pow((resourceBar > targetResource) ? (1000000 - resourceBar) / (1000000 - targetResource) : (resourceBar / targetResource), 2)) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('create:chromatic_compound'), 'input_2')
        .requireItem(Item.of('kubejs:spatial_stabilizer'), 'input_1')
        .produceItem(Item.of('kubejs:quantum_dimension_resolver', 1), 'output_1')
        .resetOnError()



    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionEachTick(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            let needUpdate = false
            let resourceBar = data.getInt('resource_bar')
            let ccItem = machine.getItemStored('input_2')
            if (ccItem.is('create:chromatic_compound')) {
                let ccCount = ccItem ? ccItem.getCount() : 0
                resourceBar = resourceBar + ccCount * 2048
                machine.setItemStored('input_2', Item.empty)
                needUpdate = true
            }
            if (ctx.remainingTime % 20 == 0) {
                resourceBar = Math.floor(resourceBar * 0.99)
                needUpdate = true
            }
            if (ctx.remainingTime % 600 == 0 && ctx.remainingTime != 3600) {
                let targetResource = data.getInt('target_resource')
                data.putInt('target_resource', targetResource + Math.floor(Math.random() * 300000) - 150000)
                needUpdate = true
            }
            if (needUpdate) {
                let targetResource = data.getInt('target_resource')
                data.putInt('resource_bar', Math.min(resourceBar, 1000000))
                tile.setPowerLevel(Math.floor(Math.abs((resourceBar - targetResource)) / 1000000 * 16))
                level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            }
            return ctx.success()
        })
        .requireFunctionOnStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            tile.setPowerLevel(0)
            level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            data.putInt('resource_bar', 2048)
            data.putInt('target_resource', Math.floor(Math.random() * 1000000))
            return ctx.success()
        })
        .requireSU(128)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const tile = ctx.getTile()
            const block = ctx.getBlock()
            const level = block.getLevel()
            let resourceBar = data.getInt('resource_bar')
            data.putInt('resource_bar', 0)
            tile.setPowerLevel(0)
            level.updateNeighborsAt(block.getPos(), block.blockState.getBlock())
            let targetResource = data.getInt('target_resource')
            if (Math.random() < Math.pow((resourceBar > targetResource) ? (1000000 - resourceBar) / (1000000 - targetResource) : (resourceBar / targetResource), 2)) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('create:chromatic_compound'), 'input_2')
        .requireItem(Item.of('minecraft:ender_eye'), 'input_1')
        .produceItem(Item.of('kubejs:entity_simulator', 1), 'output_1')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 1200)
        .requireFunctionOnEnd(ctx => {
            console.log('Congratulations.')
            console.log('New Horizon Establish.')
            console.log('Keep promise and explore the world you can\'t arrive.')
            const server = ctx.block.level.server
            if (!AStages.serverHasStage('ftb_world_computer_2', server)) {
                AStages.addStageToServer('ftb_world_computer_2', server)
            }
            return ctx.success()
        })
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            let bookItem = machine.getItemStored('input_1')
            if (bookItem.hasNBT()) {
                let nbt = bookItem.getNbt()
                let pages = nbt.getList('pages', TAG_STRING)
                for (let page of pages) {
                    console.warn(page.getAsString())
                }
            }
            return ctx.success()
        })
        .requireStructure(WorldComputerMachineStructure, WorldComputerMachineStructureMapping)
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('create:chromatic_compound'), 'input_2')
        .requireItem(Item.of('minecraft:writable_book'), 'input_1')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionOnEnd(ctx => {
            ctx.block.level.setRainLevel(2)
            return ctx.success()
        })
        .requireStructure(WorldComputerMachineStructure, WorldComputerMachineStructureMapping)
        .requireItem(Item.of('kubejs:reverse_causality_chip', 1), 'input_3')
        .requireItem(Item.of('create:chromatic_compound', 16), 'input_2')
        .requireItem(Item.of('minecraft:lightning_rod', 1), 'input_1')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionOnEnd(ctx => {
            const block = ctx.getBlock()
            const level = block.getLevel()
            let res = level.gameRules.kjs$getBoolean('doInsomnia')
            level.gameRules.set('doInsomnia', res ? 'false' : 'true')
            return ctx.success()
        })
        .requireStructure(WorldComputerMachineStructure, WorldComputerMachineStructureMapping)
        .requireItem(Item.of('kubejs:reverse_causality_chip', 16), 'input_3')
        .requireItem(Item.of('create:chromatic_compound', 16), 'input_2')
        .requireItem(Item.of('minecraft:phantom_membrane', 16), 'input_1')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionOnEnd(ctx => {
            const block = ctx.getBlock()
            const level = block.getLevel()
            let res = level.gameRules.kjs$getBoolean('doPatrolSpawning')
            level.gameRules.set('doPatrolSpawning', res ? 'false' : 'true')
            return ctx.success()
        })
        .requireStructure(WorldComputerMachineStructure, WorldComputerMachineStructureMapping)
        .requireItem(Item.of('kubejs:reverse_causality_chip', 16), 'input_3')
        .requireItem(Item.of('create:chromatic_compound', 16), 'input_2')
        .requireItem(Item.of('minecraft:totem_of_undying', 1), 'input_1')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 3600)
        .requireFunctionOnEnd(ctx => {
            const block = ctx.getBlock()
            const level = block.getLevel()
            let res = level.gameRules.kjs$getBoolean('doTraderSpawning')
            level.gameRules.set('doTraderSpawning', res ? 'false' : 'true')
            return ctx.success()
        })
        .requireStructure(WorldComputerMachineStructure, WorldComputerMachineStructureMapping)
        .requireItem(Item.of('kubejs:reverse_causality_chip', 16), 'input_3')
        .requireItem(Item.of('create:chromatic_compound', 16), 'input_2')
        .requireItem(Item.of('minecraft:emerald', 16), 'input_1')
        .resetOnError()


    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 6000)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const outputExtract = machine.getItemStored('output_1')
            const inputTarget = machine.getItemStored('input_1')
            if (!validWorldMantleInputTarget(inputTarget)) return ctx.success()
            let outputItem = inputTarget.withCount(1)
            if (!outputExtract || outputExtract.isEmpty()) {
                machine.setItemStored('output_1', outputItem)
            } else if (outputExtract.is(outputItem) && outputExtract.getCount() < outputItem.getMaxStackSize()) {
                machine.setItemStored('output_1', outputItem.withCount(Math.min(outputExtract.getCount() + 1, outputItem.getMaxStackSize())))
            }
            return ctx.success()
        })
        .requireStructure(WorldComputerMachineStructure, WorldComputerMachineStructureMapping)
        .requireItem(Item.of('kubejs:source_focus_crystal', 1), 'input_3')
        .requireItem(Item.of('create:chromatic_compound', 16), 'input_2')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 6000)
        .produceItem(Item.of('minecraft:command_block', 1))
        .requireStructure(WorldComputerMachineStructure, WorldComputerMachineStructureMapping)
        .requireItem(Item.of('kubejs:reverse_causality_chip', 64), 'input_3')
        .requireItem(Item.of('create:chromatic_compound', 16), 'input_2')
        .requireItem(Item.of('kubejs:oracle_module', 1), 'input_1')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 6000)
        .produceItem(Item.of('create:creative_blaze_cake', 1))
        .requireStructure(WorldComputerMachineStructure, WorldComputerMachineStructureMapping)
        .requireItem(Item.of('kubejs:flame_crystal', 1), 'input_3')
        .requireItem(Item.of('create:chromatic_compound', 16), 'input_2')
        .requireItem(Item.of('create:blaze_cake', 1), 'input_1')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 6000)
        .produceItem(Item.of('create:creative_motor', 1))
        .requireStructure(WorldComputerMachineStructure, WorldComputerMachineStructureMapping)
        .requireItem(Item.of('kubejs:reverse_causality_chip', 8), 'input_3')
        .requireItem(Item.of('create:chromatic_compound', 16), 'input_2')
        .requireItem(Item.of('createdieselgenerators:diesel_engine', 1), 'input_1')
        .resetOnError()
})

/**
 * 
 * @param {Internal.ItemStack} input 
 */
function validWorldMantleInputTarget(input) {
    if (input.hasTag('forge:raw_materials')) return true
    if (input.hasTag('forge:gems')) return true
    if (input.hasTag('minecraft:flowers')) return true
    if (input.isEdible()) return true
    if (input.hasTag('forge:books')) return true
    if (String(input.id) == 'minecraft:potion') return true
    return false
}