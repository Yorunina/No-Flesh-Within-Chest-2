// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('sculk_tentacles')
        .setCooldownSeconds(30)
        .setBaseManaCost(50)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(0)
        .setCastTime(20)
        .setCastType('long')
        .setSchool('irons_spellbooks:eldritch')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .setStartSound('irons_spellbooks:cast.void_tentacles.start')
        .setFinishSound('irons_spellbooks:cast.void_tentacles.finish')
        .checkPreCastConditions(ctx => {
            ISSUtils.preCastTargetHelper(ctx.level, ctx.entity, ctx.playerMagicData, ctx.spell, 32, 0.15, false)
            return true
        })
        .onCast(ctx => {
            const level = ctx.level
            if (level.isClientSide()) return
            const entity = ctx.entity
            const playerMagicData = ctx.playerMagicData

            let center = null

            const castData = playerMagicData.getAdditionalCastData()
            if (castData instanceof TargetEntityCastData) {
                const target = castData.getTarget(level)
                if (target != null) center = target.position()
            }
            if (center == null) {
                const raycast = ISSUtils.raycastForEntity(level, entity, 48, true, 0.15)
                center = ISSUtils.moveToRelativeGroundLevel(level, raycast.getLocation(), 6)
            }

            level.playSound(entity.isPlayer() ? entity : null, center.x(), center.y(), center.z(), 'irons_spellbooks:cast.void_tentacles.finish', 'ambient', 1, 1)
            let attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
            const damage = attackAttr ? attackAttr.getValue() : 5

            const tentacles = 16
            for (let i = 0; i < tentacles; i++) {
                let spawn = center.add(new Vec3d(0, 0, 2).yRot((6.281 / tentacles) * i))
                let adjustedSpawn = ISSUtils.moveToRelativeGroundLevel(level, spawn, 8)
                let belowPos = BlockPos.containing(adjustedSpawn).below()
                if (!level.getBlockState(belowPos).isAir()) {
                    let tentacle = new $VoidTentacle(level, entity, damage)
                    tentacle.moveTo(adjustedSpawn)
                    tentacle.setYBodyRot(Math.floor(Math.random() * 360))
                    level.addFreshEntity(tentacle)
                }
            }
        })
})
