// priority: 500
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:gateways', 180)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const inputAwake = machine.getItemStored('input_awake')
            const awakeStoneLevel = GatewayAwakeStoneLevelMap[inputAwake.getItem().getId()]
            data.putFloat('levelModifier', awakeStoneLevel ? awakeStoneLevel : 0)
            return ctx.success()
        })
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const block = ctx.getBlock()
            const level = block.getLevel()
            const gatewayPos = block.getPos().above()
            const player = GetNearestPlayer(level, gatewayPos, 32)
            if (!player) return ctx.error('Error')

            const levelIndicator = Math.round(data.getFloat('level_indicator'))
            const chaosIndicator = Math.round(data.getFloat('chaos_indicator'))
            const typeIndicator = Math.round(data.getFloat('type_indicator'))

            

            let gatewayColor = GatewayColorMapping.getFirstValue(typeIndicator)
            let gatewaySize = GatewaySizeMapping.getFirstValue(levelIndicator)

            let waveCount = GatewayWaveCountMapping.getNearestValue(levelIndicator)
            waveCount = waveCount ? waveCount : 3
            let gatewayModifiers = []
            GatewayChaosModifierMapping.getAllValues(chaosIndicator).forEach(modifierBuilder => {
                gatewayModifiers.push(modifierBuilder(levelIndicator, chaosIndicator))
            })

            const entityTypeCount = Math.floor(levelIndicator / 20 + 2)
            
            /** @type {PiecewiseMappingModel} */
            let levelPiecewiseMapping = GatewayWaveEntityMapping.getNearestValue(levelIndicator)
            let entityItemList = levelPiecewiseMapping.findItems(typeIndicator)
            const waveEntityRandom = new WeightRandomModel()
            entityItemList.forEach(item => {
                waveEntityRandom.addWeightRandom(item.getValue(), Math.abs(0.5 - item.getPercent(typeIndicator)) * 50 + 5)
            })
            waveEntityRandom.weightRandomList.forEach(item => {
                console.log(item.obj, item.weight)
            })

            let waves = []
            for (let i = 0; i < waveCount; i++) {
                let maxWaveTime = 200
                let points = Math.floor(100 * i + 250 + levelIndicator * 20 * (1 + i * 0.2)) / entityTypeCount
                /** @type {StandardWaveEntityItemModel[]} */
                let selectedEntityItems = waveEntityRandom.getWeightRandomObjs(entityTypeCount)
                console.log(selectedEntityItems)
                if (selectedEntityItems.length == 0) continue
                let waveEntities = []

                selectedEntityItems.forEach(waveEntityItem => {
                    let pEntityCount = Math.max(Math.floor(points / waveEntityItem.price), 1)
                    maxWaveTime += waveEntityItem.time * pEntityCount
                    waveEntities.push(waveEntityItem.create(levelIndicator, chaosIndicator, pEntityCount))
                })

                waves.push(new GatewayWave(waveEntities, gatewayModifiers, [], maxWaveTime, 200))
            }

            let gatewayNormal = new GatewayNormal(
                gatewaySize ? gatewaySize : GatewaySize.SMALL,
                gatewayColor ? gatewayColor : Color.RED,
                waves,
                [new GatewayStackReward('minecraft:oak_button')],
                [],
                GatewaySpawnAlgorithm.OPEN_FIELD,
                GatewayDefaultRule,
                GatewayDefaultBossEventSettings)

            let gatewayEntity = gatewayNormal.createEntity(level, player)
            gatewayEntity.setPos(gatewayPos.getX() + 0.5, gatewayPos.getY(), gatewayPos.getZ() + 0.5)
            gatewayEntity.spawn()
            return ctx.success()
        })

        .requireItemTag('#kubejs:gateways_awake_stone', 1, 'input_awake')
        .resetOnError()
})