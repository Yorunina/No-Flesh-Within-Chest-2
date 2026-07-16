// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('poison_splash')
        .setCooldownSeconds(20)
        .setBaseManaCost(40)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(0)
        .setCastTime(15)
        .setCastType('long')
        .setSchool('irons_spellbooks:nature')
        .setMinRarity('uncommon')
        .setMaxLevel(1)
        .setStartSound('irons_spellbooks:spell.poison_splash.begin')
        .setFinishSound('irons_spellbooks:cast.generic.poison')
        .checkPreCastConditions(ctx => {
            ISSUtils.preCastTargetHelper(ctx.level, ctx.entity, ctx.playerMagicData, ctx.spell, 32, 0.35, false)
            return true
        })
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const playerMagicData = ctx.playerMagicData

            let spawn = null
            const castData = playerMagicData.getAdditionalCastData()
            if (castData instanceof TargetEntityCastData) {
                spawn = castData.getTargetPosition(level)
            }
            if (spawn == null) {
                const raycast = ISSUtils.raycastForEntity(level, entity, 32, true)
                if (raycast instanceof $EntityHitResult) {
                    spawn = raycast.getEntity().position()
                } else {
                    const basePos = raycast.getLocation().subtract(Vec3dNormalize(entity.getForward())).add(new Vec3d(0, 2, 0))
                    spawn = ISSUtils.moveToRelativeGroundLevel(level, basePos, 5)
                }
            }

            const poisonSplash = new $PoisonSplash(level)
            poisonSplash.setOwner(entity)
            poisonSplash.moveTo(spawn)
            poisonSplash.setDamage(entity.getMaxHealth())
            poisonSplash.setEffectDuration(300)
            level.addFreshEntity(poisonSplash)
        })
})
