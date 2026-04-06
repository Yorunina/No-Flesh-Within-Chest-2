// priority: 500
RegistryArtificalTicketConvertConfig(new ArtificalTicketConvertConfigModel()
    .setCondition((machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList) => levelIndicator >= 50)
    .setResult((machine, player, levelIndicator, chaosIndicator, typeIndicator, rewardList) => rewardList.push(new GatewayStackReward(Item.of('kubejs:primal_miracle_ticket'))))
)

// todo 没改完
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:eternal_altar', 200)
        .requireFunctionOnEnd(ctx => {
            const block = ctx.getBlock()
            const level = block.getLevel()
            const gatewayPos = block.getPos().above()
            const player = GetNearestPlayer(level, gatewayPos, 32)
            if (!player) return ctx.error('')
            let wave1 = new GatewayWave([
                GatewayUtils.buildStandardWaveEntity('minecraft:slime', '', EntitySizeNbt(1), [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 3000),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 100),
                    new GatewayFunctionModifier((pEntity) => pEntity.potionEffects.add('kubejs:primal_ago', 200, 0, false, false))
                ], true, 10),
            ], [], [], 1200, 200)

            let wave2 = new GatewayWave([
                GatewayUtils.buildStandardWaveEntity('minecraft:slime', '', EntitySizeNbt(1), [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 3000),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 100),
                    new GatewayFunctionModifier((pEntity) => pEntity.potionEffects.add('kubejs:primal_ago', 200, 0, false, false))
                ], true, 10),
            ], [], [], 2400, 200)

            let wave3 = new GatewayWave([
                GatewayUtils.buildStandardWaveEntity('minecraft:slime', '', EntitySizeNbt(1), [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 3000),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 100),
                    new GatewayFunctionModifier((pEntity) => pEntity.potionEffects.add('kubejs:primal_ago', 200, 0, false, false))
                ], true, 10),
            ], [], [], 2400, 200)

            let wave4 = new GatewayWave([
                GatewayUtils.buildStandardWaveEntity('minecraft:slime', '', EntitySizeNbt(1), [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 3000),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 100),
                    new GatewayFunctionModifier((pEntity) => pEntity.potionEffects.add('kubejs:primal_ago', 200, 0, false, false))
                ], true, 10),
            ], [], [], 2400, 200)

            let wave5 = new GatewayWave([
                GatewayUtils.buildStandardWaveEntity('minecraft:bat', '', null, [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 3000),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', 100),
                    new GatewayFunctionModifier((pEntity) => pEntity.potionEffects.add('kubejs:primal_ago', 200, 0, false, false))
                ], true, 10),
            ], [], [], 2400, 200)

            let gatewayNormal = new GatewayNormal(
                GatewaySize.LARGE,
                Color.BLACK,
                [wave1, wave2, wave3, wave4, wave5],
                [
                    new GatewayStackReward(Item.of('kubejs:primal_miracle')),
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
        .requireItem(Item.of('kubejs:primal_miracle_ticket'), 'input_awake')
        .resetOnError()
})