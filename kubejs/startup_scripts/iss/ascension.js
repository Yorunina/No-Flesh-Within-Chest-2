// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('ascension')
        .setCooldownSeconds(10)
        .setBaseManaCost(30)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(0)
        .setCastTime(0)
        .setCastType('instant')
        .setSchool('irons_spellbooks:lightning')
        .setMinRarity('rare')
        .setMaxLevel(1)
        .setEmptyCastData(new $ImpulseCastData())
        .onClientCast(ctx => {
            const castData = ctx.castData
            if (castData instanceof $ImpulseCastData) {
                const entity = ctx.entity
                entity.hasImpulse = castData.hasImpulse
                const y = Math.max(entity.getDeltaMovement().y(), castData.y)
                entity.setDeltaMovement(new Vec3d(castData.x, y, castData.z))
            }
        })
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const spell = ctx.spell
            const playerMagicData = ctx.playerMagicData

            entity.addEffect(new $MobEffectInstance('irons_spellbooks:ascension', 160, 0, false, false, true))

            let vec = entity.position()
            for (let i = 0; i < 32; i++) {
                if (!level.getBlockState(BlockPos.containing(vec).below()).isAir()) break
                vec = vec.subtract(0, 1, 0)
            }

            const lightningBolt = $EntityType.LIGHTNING_BOLT.create(level)
            lightningBolt.setVisualOnly(true)
            lightningBolt.setDamage(0)
            lightningBolt.setPos(vec.x(), vec.y(), vec.z())
            level.addFreshEntity(lightningBolt)

            const baseDamage = 10
            GetLivingWithinRadiusVec3d(level, vec, 3, (pLevel, pEntity) => !ISSDamageSources.isFriendlyFireBetween(pEntity, entity)).forEach(target => {
                ISSDamageSources.applyDamage(target, baseDamage, spell.getDamageSource(lightningBolt, entity))
                target.knockback(0.25 + baseDamage / 10, entity.getX() - target.getX(), entity.getZ() - target.getZ())
            })

            const motion = Vec3dNormalize(new Vec3d(entity.getLookAngle().x(), 0, entity.getLookAngle().z())).add(0, 10, 0).scale(0.125)
            playerMagicData.setAdditionalCastData(new $ImpulseCastData(motion.x(), motion.y(), motion.z(), true))
            entity.setDeltaMovement(entity.getDeltaMovement().add(motion))
            entity.hasImpulse = true
        })
})
