// priority: 500
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
            return ctx.error('Error')
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
            return ctx.error('Error')
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
                    return ctx.error('Error')
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
            return ctx.error('Error')
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
            data.putInt('resource_bar', 8192)
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
            return ctx.error('Error')
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
            return ctx.error('Error')
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
            return ctx.error('Error')
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
            return ctx.error('Error')
        })
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('create:chromatic_compound'), 'input_2')
        .requireItem(Item.of('minecraft:ender_eye'), 'input_1')
        .produceItem(Item.of('kubejs:entity_simulator', 1), 'output_1')
        .resetOnError()

    event.recipes.custommachinery.custom_machine('kubejs:world_computer', 600)
        .requireStructure([
            [
                "ACCCA",
                "CGGGC",
                "CGGGC",
                "CGGGC",
                "ACCCA"
            ],
            [
                "C   C",
                " HSH ",
                " SRS ",
                " WmY ",
                "C   C"
            ],
            [
                "C   C",
                " JKJ ",
                " KRK ",
                " JKJ ",
                "C   C"
            ],
            [
                "C   C",
                " LLL ",
                " LRL ",
                " LLL ",
                "C   C"
            ],
            [
                "CCCCC",
                "CN NC",
                "C V C",
                "CN NC",
                "CCCCC"
            ],
            [
                "     ",
                " O O ",
                "     ",
                " O O ",
                "     "
            ]
        ],
            {
                "C": "create:fluid_pipe",
                "K": "createprism:train_clear_glass_casing",
                "J": "create:nixie_tube",
                "O": "create:brass_casing",
                "S": "kubejs:void_diffraction_vault",
                "V": "create_power_loader:brass_chunk_loader",
                "N": "minecraft:lightning_rod",
                "L": "kubejs:world_renderer",
                "R": "kubejs:cerebral_brain_processor",
                "W": "kubejs:quantum_dimension_resolver",
                "A": "create:railway_casing",
                "Y": "kubejs:entity_simulator",
                "H": "kubejs:computing_core",
                "G": "kubejs:data_compressor",
            })
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
        .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_2')
        .produceItem(Item.of('minecraft:acacia_boat', 1), 'output_1')
        .resetOnError()
})

