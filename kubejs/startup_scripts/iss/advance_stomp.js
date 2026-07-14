// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('advance_stomp')
        .setCooldownSeconds(16)
        .setBaseManaCost(75)
        .setManaCostPerLevel(20)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(1)
        .setCastType('long')
        .setSchool('irons_spellbooks:nature')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const spellLevel = ctx.spellLevel
            const spell = ctx.spell
            let facing = entity.getForward()
            let spawn = ISSUtils.moveToRelativeGroundLevel(level, entity.getEyePosition().add(new Vec3d(facing.x(), 0, facing.z())), 1)
            let bpos = BlockPos.containing(spawn)
            level.spawnParticles(new $BlockParticleOption($ParticleTypes.BLOCK, level.getBlockState(bpos)).setPos(bpos), false, spawn.x(), spawn.y(), spawn.z(), 0.0, 0.0, 0.0, 40, 0.20 + 0.05 * spellLevel)
            let stomp = new $StompAoe(level, 9, entity.getYHeadRot())
            stomp.moveTo(spawn)
            stomp.setDamage(spell.getSpellPower(ctx.spellLevel, entity) * entity.getMaxHealth())

            stomp.setExplosionRadius(spell.getEntityPowerMultiplier(entity))
            stomp.setOwner(entity)
            level.addFreshEntity(stomp)
        })
        .getEffectiveCastTime(ctx => {
            const spellLevel = ctx.spellLevel
            const spell = ctx.spell
            return spell.getCastTime(spellLevel)
        })
})
