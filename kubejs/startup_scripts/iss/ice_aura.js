// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('ice_aura')
        .setCooldownSeconds(30)
        .setBaseManaCost(30)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(0)
        .setCastTime(20)
        .setCastType('long')
        .setSchool('irons_spellbooks:ice')
        .setMinRarity('common')
        .setMaxLevel(1)
        .setStopSoundOnCancel(true)
        .setStartSound('irons_spellbooks:spell.heat_surge.prepare')
        .setCastStartAnimation('irons_spellbooks:charge_raised_hand', false, false)
        .setCastFinishAnimation('irons_spellbooks:touch_ground', true, true)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const radius = 10

            const targets = GetLivingWithinRadiusVec3d(level, entity.position(), radius, (level, pEntity) => !ISSDamageSources.isFriendlyFireBetween(pEntity, entity) && !pEntity.isPassenger() && !pEntity.isSpectator())

            const duration = 20 * 15
            const damageAmplifier = targets.length
            for (let target of targets) {
                let iceTombEntity = new $IceTombEntity(level, target)
                iceTombEntity.moveTo(target.position())
                iceTombEntity.setDeltaMovement(target.getDeltaMovement())
                iceTombEntity.setEvil()
                iceTombEntity.setLifetime(duration)
                iceTombEntity.setDamageAmplifier(damageAmplifier)
                level.addFreshEntity(iceTombEntity)
                target.startRiding(iceTombEntity, true)
            }
        })
})