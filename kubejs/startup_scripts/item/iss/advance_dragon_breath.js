// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('advance_dragon_breath')
        .setCastTime(100)
        .setCooldownSeconds(10)
        .setBaseManaCost(5)
        .setManaCostPerLevel(1)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(1)
        .setCastType('continuous')
        .setSchool('irons_spellbooks:ender')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const magicData = ctx.playerMagicData
            const castData = magicData.getAdditionalCastData()
            const spell = ctx.spell
            if (magicData.isCasting()
                && magicData.getCastingSpell().getSpell().equals(ctx.spell)
                && castData instanceof $EntityCastData
                && castData.getCastingEntity() instanceof $AbstractConeProjectile) {
                castData.getCastingEntity().setDealDamageActive()
            } else {
                EntityJSUtils.getEntityBuilder('kubejs:advance_dragon_breath')
                /**@type {Internal.AbstractConeProjectile} */
                let dragonBreathProjectile = level.createEntity('kubejs:advance_dragon_breath')
                dragonBreathProjectile.setOwner(entity)
                dragonBreathProjectile.setPos(entity.position().add(0, entity.getEyeHeight() * 0.7, 0))
                dragonBreathProjectile.setDamage(Math.max(entity.chestCavityInstance.getOrganScore('kubejs:dragon_blood'), 1) * spell.getSpellPower(ctx.spellLevel, entity))
                level.addFreshEntity(dragonBreathProjectile)
                magicData.setAdditionalCastData(new $EntityCastData(dragonBreathProjectile))
            }
        })
})


StartupEvents.registry('entity_type', event => {
    event.create('advance_dragon_breath', 'irons_spells_js:cone_projectile')
        .spawnParticles(/**@param {Internal.AbstractConeProjectile} projectile*/(projectile) => {
            const owner = projectile.getOwner()
            const level = projectile.level
            if (!level.isClientSide() || owner == null) return
            let rotation = Vec3dNormalize(owner.getLookAngle())
            let pos = owner.position().add(rotation.scale(1.6))
            let x = pos.x()
            let y = pos.y() + owner.getEyeHeight() * 0.9
            let z = pos.z()

            let offset = 0.15
            let speed = Math.random() * 0.35 + 0.25
            for (let i = 0; i < 12; i++) {
                let ox = Math.random() * 2 * offset - offset
                let oy = Math.random() * 2 * offset - offset
                let oz = Math.random() * 2 * offset - offset
                let angularness = 0.3
                let randomVec = Vec3dNormalize(new Vec3d(Math.random() * 2 * angularness - angularness, Math.random() * 2 * angularness - angularness, Math.random() * 2 * angularness - angularness))
                let result = Vec3dNormalize(rotation.scale(3).add(randomVec)).scale(speed)
                level.addParticle($ParticleTypes.DRAGON_BREATH, x + ox, y + oy, z + oz, result.x(), result.y(), result.z())
            }
        })
        .onConeHitEntity((ctx) => {
            /**@type {Internal.ConeProjectileJS} */
            const projectile = ctx.entity
            const entityHitResult = ctx.entityHitResult
            const entity = entityHitResult.getEntity()
            const level = projectile.level
            const owner = projectile.getOwner()
            if ($ISSDamageSources.applyDamage(entity, projectile.damage,
                SpellRegistry["getSpell(net.minecraft.resources.ResourceLocation)"](new ResourceLocation('kubejs:advance_dragon_breath')).getDamageSource(projectile, owner)
            )) {
                if (owner instanceof $LivingEntity) {
                    owner.heal(projectile.damage)
                }
                if (Math.random() < 0.3) {
                    /**@type {Internal.AoeEntity} */
                    let pool = level.createEntity('kubejs:advance_dragon_breath_pool')
                    pool.setOwner(owner)
                    pool.setDamage(projectile.damage)
                    pool.moveTo(entity.position())
                    level.addFreshEntity(pool)
                }
            }
        })
        .sized(1, 1)
        .clientTrackingRange(64)

    event.create('advance_dragon_breath_pool', 'irons_spells_js:aoe_entity')
        .applyEffect((ctx) => {
            /**@type {Internal.AoeEntityJS} */
            const pool = ctx.entity
            const target = ctx.target
            const customData = pool.customData
            const owner = pool.getOwner()
            if (!customData.containsKey('damageSources')) {
                customData.put('damageSources', new DamageSource($ISSDamageSources.getHolderFromResource(target, $ISSDamageTypes.DRAGON_BREATH_POOL), pool, owner))
            }
            $ISSDamageSources.ignoreNextKnockback(target)
            if (owner instanceof $Player && owner.getLuck() > 0) {
                target.setTicksFrozen(target.getTicksFrozen() + owner.getLuck() * 2)
            }
            target.attack(customData.get('damageSources'), pool.damage)
        })
        .getParticleCount((pool) => {
            return 0.3
        })
        .getParticle((pool) => {
            return $ParticleTypes.DRAGON_BREATH
        })
        .sized(4, 1.2)
        .clientTrackingRange(64)

})