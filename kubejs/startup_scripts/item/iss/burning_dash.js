// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('burning_dash')
        .setCooldownSeconds(3)
        .setBaseManaCost(10)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(1)
        .setCastType('instant')
        .setSchool('irons_spellbooks:fire')
        .setMinRarity('common')
        .setMaxLevel(1)
        .setEmptyCastData(new $ImpulseCastData())
        .onClientCast(ctx => {
            const castData = ctx.castData
            if (castData instanceof $ImpulseCastData) {
                ctx.entity.hasImpulse = castData.hasImpulse
                ctx.entity.setDeltaMovement(ctx.entity.getDeltaMovement().add(new Vec3d(castData.x, castData.y, castData.z)))
            }
        })
        .onCast(ctx => {
            const entity = ctx.entity
            const spell = ctx.spell
            const spellLevel = ctx.spellLevel
            const playerMagicData = ctx.playerMagicData

            entity.hasImpulse = true
            const multiplier = (40 + spell.getSpellPower(spellLevel, entity)) / 12.0

            let forward = entity.getLookAngle()
            let vec = Vec3dNormalize(Vec3dMultiply(forward, 3, 1, 3)).scale(multiplier).add(new Vec3d(0, 0.25, 0))
            if (entity.onGround()) {
                entity.setPos(entity.position().add(new Vec3d(0, 1.5, 0)))
                vec = vec.add(new Vec3d(0, 0.25, 0))
            }

            playerMagicData.setAdditionalCastData(new $ImpulseCastData(vec.x(), vec.y(), vec.z(), true))
            const dm = entity.getDeltaMovement()
            entity.setDeltaMovement(new Vec3d(Lerp(0.75, dm.x(), vec.x()), Lerp(0.75, dm.y(), vec.y()), Lerp(0.75, dm.z(), vec.z())))
            entity.addEffect(new $MobEffectInstance('irons_spellbooks:burning_dash', 15, 0, false, false, false))
            playerMagicData.getSyncedData().setSpinAttackType($SpinAttackType.FIRE)
        })
        .getDamageSource(ctx => {
            return $SpellDamageSource.source(ctx.projectile, ctx.attacker, ctx.spell).setFireTicks(80)
        })
})
