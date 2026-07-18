// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('flaming_strike')
        .setCooldownSeconds(10)
        .setBaseManaCost(30)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(0)
        .setCastTime(10)
        .setCastType('long')
        .setSchool('irons_spellbooks:fire')
        .setMinRarity('common')
        .setMaxLevel(1)
        .setCanBeInterrupted((player) => false)
        .setStartSound('irons_spellbooks:spell.flaming_strike.begin')
        .setFinishSound('irons_spellbooks:spell.flaming_strike.cast')
        .setCastStartAnimation('irons_spellbooks:horizontal_slash_one_handed', true, false)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const spell = ctx.spell
            const playerMagicData = ctx.playerMagicData

            const radius = 4
            const forward = entity.getForward()

            const hitLocation = entity.position().add(0, entity.getBbHeight() * 0.3, 0).add(forward.scale(2))

            const entities = level.getEntitiesWithin(AABB.ofSize(hitLocation, radius * 2, radius, radius * 2))
            const damageSource = spell.getDamageSource(entity)
            const attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
            const damage = attackAttr ? attackAttr.getValue() * 2 : 10
            for (let targetEntity of entities) {
                if (!targetEntity.isAlive()) continue
                if (targetEntity.position().subtract(entity.getEyePosition()).dot(forward) < 0) continue
                if (entity.distanceToSqr(targetEntity) >= radius * radius) continue

                const offsetVector = targetEntity.getBoundingBox().getCenter().subtract(entity.getEyePosition())
                if (offsetVector.dot(forward) < 0) continue

                if (ISSDamageSources.applyDamage(targetEntity, damage, damageSource)) {
                    MagicManager.spawnParticles(level, IronsSpellsParticleHelper.FIRE, targetEntity.getX(), targetEntity.getY() + targetEntity.getBbHeight() * 0.5, targetEntity.getZ(), 30, targetEntity.getBbWidth() * 0.5, targetEntity.getBbHeight() * 0.5, targetEntity.getBbWidth() * 0.5, 0.03, false)
                }
            }

            const mirrored = playerMagicData.getCastingEquipmentSlot().equals($SpellSelectionManager.OFFHAND)
            MagicManager.spawnParticles(level, new $FlameStrikeParticleOptions(forward.x(), forward.y(), forward.z(), mirrored, false, 1.0), hitLocation.x(), hitLocation.y() + 0.5, hitLocation.z(), 1, 0, 0, 0, 0, true)
        })
        .getDamageSource(ctx => {
            return $SpellDamageSource.source(ctx.projectile, ctx.attacker, ctx.spell).setFireTicks(60)
        })
        .getEffectiveCastTime(ctx => {
            return ctx.spell.getCastTime(ctx.spellLevel)
        })
})