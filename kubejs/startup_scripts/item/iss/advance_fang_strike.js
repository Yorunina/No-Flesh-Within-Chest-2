// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('advance_fang_strike')
        .setCastTime(20)
        .setCooldownSeconds(5)
        .setBaseManaCost(50)
        .setManaCostPerLevel(20)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(1)
        .setCastType('long')
        .setSchool('irons_spellbooks:evocation')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            let forward = entity.getForward().multiply(1, 0, 1).normalize()
            let start = entity.getEyePosition().add(forward.scale(1.5))

            let spellPower = entity.getAttributeValue('irons_spellbooks:spell_power')
            let schoolSpellPower = entity.getAttributeValue('irons_spellbooks:evocation_spell_power')
            let damage = entity.getMaxHealth() * ctx.getSpellLevel() * spellPower * schoolSpellPower

            for (let i = 0; i < 16; i++) {
                let spawn = start.add(forward.scale(i))
                spawn = new Vec3d(spawn.x(), GetGroundLevel(level, spawn, 8), spawn.z())
                if (!level.getBlockState(BlockPos.containing(spawn).below()).isAir()) {
                    let delay = i / 3
                    let fang = new $ExtendedEvokerFang(level, spawn.x(), spawn.y(), spawn.z(), (entity.getYHeadRot() - 90) * Mth.DEG_TO_RAD, delay, entity, damage)
                    level.addFreshEntity(fang)
                }
            }
        })
})
