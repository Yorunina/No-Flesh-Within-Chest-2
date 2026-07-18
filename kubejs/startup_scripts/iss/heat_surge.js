// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('heat_surge')
        .setCooldownSeconds(30)
        .setBaseManaCost(50)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(0)
        .setCastTime(20)
        .setCastType('long')
        .setSchool('irons_spellbooks:fire')
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
            const duration = 400
            const rendAmplifier = 9

            const fireColor = SchoolRegistry.FIRE.get().getTargetingColor()

            MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(fireColor, radius), entity.getX(), entity.getY() + 0.165, entity.getZ(), 1, 0, 0, 0, 0, true)

            PacketDistributor.sendToPlayersTrackingEntityAndSelf(entity,
                new $ShockwaveParticlesPacket(
                    new Vec3d(entity.getX(), entity.getY() + 0.165, entity.getZ()),
                    radius,
                    ParticleRegistry.FIRE_PARTICLE.get()
                )
            )

            const targets = GetLivingWithinRadiusVec3d(level, entity.position(), radius, (level, pEntity) => !ISSDamageSources.isFriendlyFireBetween(pEntity, entity))

            for (let target of targets) {
                target.addEffect(new $MobEffectInstance('irons_spellbooks:rend', duration, rendAmplifier))
                target.setRemainingFireTicks(Math.min(duration / 2, 160))
                MagicManager.spawnParticles(level, IronsSpellsParticleHelper.EMBERS, target.getX(), target.getY() + target.getBbHeight() * 0.5, target.getZ(), 50, target.getBbWidth() * 0.5, target.getBbHeight() * 0.5, target.getBbWidth() * 0.5, 0.03, false)
            }
        })
})