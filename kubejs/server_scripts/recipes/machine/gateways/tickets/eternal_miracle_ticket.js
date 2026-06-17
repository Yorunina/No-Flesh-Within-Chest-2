// priority: 500
RegistryArtificalTicketConvertConfig(new ArtificalTicketConvertConfigModel()
    .setCondition((machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList) => levelIndicator >= 20 && typeIndicator >= 50)
    .setResult((machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList) => new GatewayStackReward(Item.of('kubejs:eternal_miracle_ticket')))
)
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:eternal_altar', 200)
        .requireFunctionOnEnd(ctx => {
            const block = ctx.getBlock()
            const level = block.getLevel()
            const gatewayPos = block.getPos().above()
            const player = GetNearestPlayer(level, gatewayPos, 32)
            if (!player) return ctx.error('')
            let wave1 = new GatewayWave([
                // 渊灵 200 空手9 武器14.5 远程6.5 * 10
                GatewayUtils.buildStandardWaveEntity('cataclysm:deepling', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 174),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 10)
            ], [
                GatewayUtils.buildEffectModifier(1, 'kubejs:frost_shield', 0, true, false),
            ], [], 3600, 200)

            let wave2 = new GatewayWave([
                // 渊灵 200 空手9 武器14.5 远程6.5 * 3
                GatewayUtils.buildStandardWaveEntity('cataclysm:deepling', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 174),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 3),
                // 珊瑚巨像 600 * 3
                GatewayUtils.buildStandardWaveEntity('cataclysm:coralssus', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 440),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 3)
            ], [
                GatewayUtils.buildEffectModifier(1, 'kubejs:frost_shield', 2, true, false)
            ], [], 3600, 200)

            let wave3 = new GatewayWave([
                // 渊灵 400 空手9 武器14.5 远程6.5 * 5
                GatewayUtils.buildStandardWaveEntity('cataclysm:deepling', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 374),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 5),
                // 渊灵祭司 200 空手12 武器16 * 5
                GatewayUtils.buildStandardWaveEntity('cataclysm:deepling_priest', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 155),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 8),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 5),
            ], [
                GatewayUtils.buildEffectModifier(1, 'kubejs:frost_shield', 4, true, false)
            ], [], 3600, 200)

            let wave4 = new GatewayWave([
                // 珊瑚巨像 800 * 3
                GatewayUtils.buildStandardWaveEntity('cataclysm:coralssus', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 640),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 3),
                // 渊灵祭司 200 空手20 武器24 * 3
                GatewayUtils.buildStandardWaveEntity('cataclysm:deepling_priest', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 155),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 16),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 3),
            ], [
                GatewayUtils.buildEffectModifier(1, 'kubejs:frost_shield', 4, true, false)
            ], [], 3600, 200)

            let wave5 = new GatewayWave([
                // 渊灵 400 空手9 武器14.5 远程6.5 * 5
                GatewayUtils.buildStandardWaveEntity('cataclysm:deepling', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 374),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 5),
                // 渊灵祭司 200 空手20 武器24 * 3
                GatewayUtils.buildStandardWaveEntity('cataclysm:deepling_priest', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 155),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 16),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 3),
                // 渊灵蛮兵 600 空手12 武器21 * 3
                GatewayUtils.buildStandardWaveEntity('cataclysm:deepling_brute', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 540),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 7),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ], true, 3),
            ], [
                GatewayUtils.buildEffectModifier(1, 'kubejs:frost_shield', 4, true, false)
            ], [], 3600, 200)

            let gatewayNormal = new GatewayNormal(
                GatewaySize.LARGE,
                Color.AQUA,
                [wave1, wave2, wave3, wave4, wave5],
                [
                    new GatewayStackReward(Item.of('kubejs:eternal_miracle')),
                    new GatewayFunctionReward((ctx) => {
                        TitleManager.unlockTitle(ctx.summoner(), 'kubejs:frost_melter')
                    }),
                ],
                [],
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
        .requireItem(Item.of('kubejs:eternal_miracle_ticket'), 'input_awake')
        .resetOnError()
})