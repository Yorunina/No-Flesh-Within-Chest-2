// priority: 500
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:eternal_altar', 200)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const block = ctx.getBlock()
            const level = block.getLevel()
            const gatewayPos = block.getPos().above()
            const player = GetNearestPlayer(level, gatewayPos, 32)
            if (!player) return ctx.error('')

            const levelIndicator = Math.round(data.getFloat('level_indicator'))
            const chaosIndicator = Math.round(data.getFloat('chaos_indicator'))
            const typeIndicator = Math.round(data.getFloat('type_indicator'))
            const extractantItem = machine.getItemStored('input_extractant')
            const auxiliaryItem = machine.getItemStored('input_auxiliary')

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

            let waves = []
            for (let i = 0; i < waveCount; i++) {
                let maxWaveTime = 200
                let points = Math.floor(100 * i + 250 + levelIndicator * 20 * (1 + i * 0.2)) / entityTypeCount
                /** @type {StandardWaveEntityItemModel[]} */
                let selectedEntityItems = waveEntityRandom.getWeightRandomObjs(entityTypeCount)
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
                eternalAltarGatewayArtificialTicketReward(machine, player, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem),
                EternalAltarGatewayArtificialTicketFailure(machine, player, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem),
                GatewaySpawnAlgorithm.OPEN_FIELD,
                GatewayDefaultRule,
                GatewayDefaultBossEventSettings)

            let gatewayEntity = gatewayNormal.createEntity(level, player)
            gatewayEntity.setPos(gatewayPos.getX() + 0.5, gatewayPos.getY(), gatewayPos.getZ() + 0.5)
            gatewayEntity.spawn()
            level.playSound(null, gatewayPos.getX(), gatewayPos.getY(), gatewayPos.getZ(), 'block.bell.use', player.getSoundSource(), 1, 1)
            return ctx.success()
        })
        .requireFunctionToStart(ctx => {
            const block = ctx.getBlock()
            const level = block.getLevel()
            const gatewayPos = block.getPos().above()
            let entityList = GetEntityWithinRadius(level, gatewayPos, 1, (pLevel, pEntity) => pEntity instanceof $GatewayEntity)
            if (entityList.length > 0) return ctx.error('')
            return ctx.success()
        })
        .requireItem(Item.of('kubejs:artificial_miracle_ticket'), 'input_awake')
        .resetOnError()
})


/**
 * @param {CustomMachine} machine 
 * @param {Player} player
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.List<Internal.Reward>} rewardList 
 */
function artificalTicketConvert(machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList) {
    for (let config of ArtificalTicketConvertConfigList) {
        if (config.isMatch(machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList)) {
            rewardList.push(config.apply(machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList))
            break
        }
    }
}


/**
 * 
 * @param {CustomMachine} machine 
 * @param {Player} player
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 * @returns {Internal.List<Internal.Reward>}
 */
function eternalAltarGatewayArtificialTicketReward(machine, player, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    const rewardList = []
    const data = machine.getData()
    if (!data) return rewardList
    // 应用auxiliaryItem
    if (auxiliaryItem && !auxiliaryItem.isEmpty()) {
        let typeModifier = GatewayAuxiliaryMaterialTypeMap[auxiliaryItem.getId()]
        let chaosModifier = GatewayAuxiliaryMaterialChaosMap[auxiliaryItem.getId()]
        rewardList.push(new GatewayFunctionReward((ctx) => {
            let targetChaos = Clamp(chaosIndicator + chaosModifier, 0, 60)
            data.put('chaos_indicator', targetChaos)

            let targetType = Clamp(typeIndicator + typeModifier, 0, 60)
            data.put('type_indicator', targetType)
        }))
    } else {
        data.put('chaos_indicator', Clamp(chaosIndicator - levelModifier - 1, 0, 60))
    }
    eternalAltarSubmitQuest(player, levelIndicator, chaosIndicator, typeIndicator)
    // Ticket特殊掉落物
    artificalTicketConvert(machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList)

    // 应用extractantItem策略
    if (!extractantItem || extractantItem.isEmpty()) return rewardList
    const customData = {}
    customData.rewardList = []
    customData.levelIndicator = levelIndicator
    customData.chaosIndicator = chaosIndicator
    customData.typeIndicator = typeIndicator
    GatewayExtractantStrategy.run([extractantItem.getId()], [machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem], customData)
    DamageItem(extractantItem)
    return rewardList.concat(customData.rewardList)
}