// priority: 500
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:gateways', 60)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const block = ctx.getBlock()
            const level = block.getLevel()
            const player = GetNearestPlayer(level, gatewayPos, 32)
            if (!player) return ctx.error('Error')

            const levelIndicator = Math.round(data.getFloat('level_indicator'))
            const chaosIndicator = Math.round(data.getFloat('chaos_indicator'))
            const typeIndicator = Math.round(data.getFloat('type_indicator'))

            const gatewayPos = block.getPos().above()

            let gatewayColor = GatewayColorMapping.getFirstValue(typeIndicator)
            let gatewaySize = GatewaySizeMapping.getFirstValue(levelIndicator)

            let waveCount = GatewayWaveCountMapping.getNearestValue(levelIndicator)
            waveCount = waveCount ? waveCount : 3
            let gatewayModifiers = []
            GatewayChaosModifierMapping.getAllValues(chaosIndicator).forEach(modifierBuilder => {
                gatewayModifiers.push(modifierBuilder(levelIndicator, chaosIndicator))
            })

            const entityTypeCount = Math.floor(levelIndicator / 20 + 2)
            let points = Math.floor(500 + levelIndicator * 20 * (chaosIndicator / 20 + 1)) / entityTypeCount
            let levelPiecewiseMapping = GatewayWaveEntityMapping.getNearestValue(levelIndicator)
            let entityItemList = levelPiecewiseMapping.findItems(typeIndicator)
            const waveEntityRandom = new WeightRandomModel()
            entityItemList.forEach(item => {
                waveEntityRandom.addWeightRandom(item.getValue(), Math.abs(item.getPercent(typeIndicator) - 0.5))
            })

            let waves = []
            for (let i = 0; i < waveCount; i++) {
                let waveSetupTime = 200
                /** @type {WaveEntityItemModel[]} */
                let selectedEntityItems = waveEntityRandom.getWeightRandomObjs(entityTypeCount)
                if (selectedEntityItems.length == 0) continue
                let waveEntities = []

                selectedEntityItems.forEach(waveEntityItem => {
                    waveSetupTime += waveEntityItem.time * pEntityCount
                    let pEntityCount = Math.max(Math.floor(points / waveEntityItem.price), 1)
                    waveEntities.push(
                        GatewayUtils.buildStandardWaveEntity(
                            waveEntityItem.entityType,
                            '',
                            waveEntityItem.compoundTag,
                            waveEntityItem.modifier(levelIndicator, chaosIndicator),
                            false,
                            pEntityCount
                        )
                    )
                })

                waves.push(new GatewayWave(waveEntities, gatewayModifiers, [], waveSetupTime, 200))
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
            gatewayEntity.setPos(gatewayPos.getX(), gatewayPos.getY(), gatewayPos.getZ())
            gatewayEntity.spawn()
        })
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const inputAwake = machine.getItemStored('input_awake')
            const awakeStoneLevel = GatewayAwakeStoneLevelMap[inputAwake.getItem().getId()]
            data.putInt('levelModifier', awakeStoneLevel ? awakeStoneLevel : 0)
        })
        .requireItemTag('#kubejs:gateways_awake_stone', 1, 'input_awake')
        .resetOnError()
})