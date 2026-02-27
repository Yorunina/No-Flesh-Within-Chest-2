// priority: 500
RegistryArtificalTicketConvertConfig(new ArtificalTicketConvertConfigModel()
    .setCondition((machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList) => levelIndicator >= 20 && typeIndicator >= 20 && typeIndicator < 30)
    .setResult((machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList) => rewardList.push(new GatewayStackReward(Item.of('kubejs:incandescent_miracle_ticket'))))
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
                GatewayUtils.buildStandardWaveEntity('minecraft:zombified_piglin', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 180),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildEffectModifier(1, 'kubejs:spectral_fire', 2, true, true)
                ], true, 1),
                GatewayUtils.buildStandardWaveEntity('minecraft:zombified_piglin', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 180),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                ], true, 9),
            ], [], [], 3600, 200)
            let wave2 = new GatewayWave([
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_berserker', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 335),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                    GatewayUtils.buildEffectModifier(1, 'kubejs:spectral_fire', 0, true, true),
                ], true, 1),
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_berserker', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 335),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                ], true, 4),
            ], [], [], 3600, 200)

            let wave3 = new GatewayWave([
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_berserker', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 335),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                    GatewayUtils.buildEffectModifier(1, 'kubejs:spectral_fire', 0, true, true),
                ], true, 1),
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_berserker', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 335),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                ], true, 3),
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_revenant', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 520),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 8),
                ], true, 1),
            ], [], [], 3600, 200)

            let wave4 = new GatewayWave([
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_berserker', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 335),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                    GatewayUtils.buildEffectModifier(1, 'kubejs:spectral_fire', 0, true, true),
                    GatewayUtils.buildEffectModifier(1, 'minecraft:invisibility', 0, true, true),
                ], true, 1),
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_berserker', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 335),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                ], true, 3),
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_revenant', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 520),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 8),
                ], true, 1),
            ], [], [], 3600, 200)

            let wave5 = new GatewayWave([
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_berserker', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 135),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                    GatewayUtils.buildEffectModifier(1, 'kubejs:spectral_fire', 0, true, true),
                ], true, 1),
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignited_berserker', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 135),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', 5),
                ], true, 9),
                GatewayUtils.buildStandardWaveEntity('cataclysm:ignis', '', GatewayNBTEntityBaby, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 1550),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 200),
                    GatewayUtils.buildEffectModifier(1, 'brewery:toxictouch', 0, true, false),
                ], true, 10)
            ], [], [], 3600, 200)

            let gatewayNormal = new GatewayNormal(
                GatewaySize.LARGE,
                Color.DARK_RED,
                [wave1, wave2, wave3, wave4, wave5],
                [
                    new GatewayStackReward(Item.of('kubejs:incandescent_miracle')),
                    new GatewayFunctionReward((ctx) => {
                        TitleManager.unlockTitle(ctx.summoner(), 'kubejs:blast_soul')
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
        .requireItem(Item.of('kubejs:incandescent_miracle_ticket'), 'input_awake')
        .resetOnError()
})