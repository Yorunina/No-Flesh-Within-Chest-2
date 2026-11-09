// priority: 500

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('advance_volt_strike')
        .setCooldownSeconds(10)
        .setBaseManaCost(30)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(1)
        .setCastType('instant')
        .setSchool('irons_spellbooks:lightning')
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

            const attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
            const damage = Math.max(1, Math.floor((attackAttr ? attackAttr.getValue() : 10) * 0.5))

            entity.hasImpulse = true
            const multiplier = (15 + spell.getSpellPower(spellLevel, entity)) / 10.0
            const forward = entity.getLookAngle()

            const upward = Math.max(forward.y(), 0.6)

            let vec = forward.scale(3.0 * multiplier).add(new Vec3d(0, upward, 0))
            if (entity.onGround()) {

                entity.setPos(entity.position().add(new Vec3d(0, 1.2, 0)))
                vec = vec.add(new Vec3d(0, 0.5, 0))
            }

            playerMagicData.setAdditionalCastData(new $ImpulseCastData(vec.x(), vec.y(), vec.z(), true))

            const dm = entity.getDeltaMovement()
            entity.setDeltaMovement(new Vec3d(Lerp(0.75, dm.x(), vec.x()), Lerp(0.75, dm.y(), vec.y()), Lerp(0.75, dm.z(), vec.z())))

            entity.addEffect(new $MobEffectInstance('irons_spellbooks:volt_strike', 10, damage, false, false, false))

            playerMagicData.getSyncedData().setSpinAttackType($SpinAttackType.LIGHTNING)
        })
        .getDamageSource(ctx => {

            return $SpellDamageSource.source(ctx.projectile, ctx.attacker, ctx.spell)
        })
})
