// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('shockwave')
        .setCooldownSeconds(20)
        .setBaseManaCost(70)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(1)
        .setCastTime(16)
        .setCastType('long')
        .setSchool('irons_spellbooks:lightning')
        .setMinRarity('common')
        .setMaxLevel(1)
        .setStartSound('irons_spellbooks:spell.shockwave.prepare')
        .setFinishSound('irons_spellbooks:spell.shockwave.cast')
        .setCastStartAnimation('irons_spellbooks:cross_arms', false, false)
        .setCastFinishAnimation('irons_spellbooks:cast_t_pose', true, false)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const spell = ctx.spell

            const radius = 16
            const attackDamageAttr = entity.getAttribute('minecraft:generic.attack_damage')
            const damage = attackDamageAttr ? attackDamageAttr.getValue() : 10


            MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(0.7, 1, 1, radius * 1.02), entity.getX(), entity.getY() + 0.15, entity.getZ(), 1, 0, 0, 0, 0, true)
            MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(0.7, 1, 1, radius * 0.98), entity.getX(), entity.getY() + 0.15, entity.getZ(), 1, 0, 0, 0, 0, true)
            MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(1, 1, 1, radius), entity.getX(), entity.getY() + 0.165, entity.getZ(), 1, 0, 0, 0, 0, true)
            MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(1, 1, 1, radius), entity.getX(), entity.getY() + 0.135, entity.getZ(), 1, 0, 0, 0, 0, true)
            MagicManager.spawnParticles(level, IronsSpellsParticleHelper.ELECTRICITY, entity.getX(), entity.getY() + 1, entity.getZ(), 80, 0.25, 0.25, 0.25, 0.7 + radius * 0.1, false)

            CameraShakeManager.addCameraShake(new CameraShakeData(level, 30, entity.position(), radius * 2))

            const start = entity.getBoundingBox().getCenter()
            const damageSource = spell.getDamageSource(entity)

            const targets = GetLivingWithinRadiusVec3d(level, entity.position(), radius, (pLevel, pEntity) => pEntity != entity && pEntity.isPickable() && !pEntity.isSpectator() && !ISSDamageSources.isFriendlyFireBetween(pEntity, entity) && ISSUtils['hasLineOfSight(net.minecraft.world.level.Level,net.minecraft.world.entity.Entity,net.minecraft.world.entity.Entity,boolean)'](level, entity, pEntity, true))

            for (let pTarget of targets) {
                let dest = pTarget.getBoundingBox().getCenter()
                MagicManager.spawnParticles(level, new $ZapParticleOption(dest), start.x(), start.y(), start.z(), 1, 0, 0, 0, 0, true)
                MagicManager.spawnParticles(level, IronsSpellsParticleHelper.ELECTRICITY, pTarget.getX(), pTarget.getY() + pTarget.getBbHeight() / 2, pTarget.getZ(), 10, pTarget.getBbWidth() / 3, pTarget.getBbHeight() / 3, pTarget.getBbWidth() / 3, 0.1, false)
                ISSDamageSources.applyDamage(pTarget, damage, damageSource)
            }

            for (let i = 0; i < 7; i++) {
                let dest = start.add(ISSUtils.getRandomVec3(1).multiply(4, 2.5, 4).add(0, 4, 0))
                MagicManager.spawnParticles(level, new $ZapParticleOption(dest), start.x(), start.y(), start.z(), 1, 0, 0, 0, 0, true)
            }
        })
})
