// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('real_black_hole')
        .setCooldownSeconds(120)
        .setBaseManaCost(300)
        .setManaCostPerLevel(100)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(0)
        .setCastTime(100)
        .setCastType('long')
        .setSchool('irons_spellbooks:ender')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .setStartSound('irons_spellbooks:spell.black_hole.charge')
        .setFinishSound('irons_spellbooks:spell.black_hole.cast')
        .setCastStartAnimation('irons_spellbooks:charge_black_hole', true, false)
        .setCastFinishAnimation('irons_spellbooks:long_cast_finish', true, false)
        .setStopSoundOnCancel(true)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const spell = ctx.spell
            const spellLevel = ctx.spellLevel

            const spellPower = spell.getSpellPower(spellLevel, entity)
            const radius = 16 + (0.25 * spellPower)

            const raycast = ISSUtils.raycastForEntity(level, entity, 16 + radius * 1.5, true)
            let center = raycast.getLocation()

            if (raycast instanceof $BlockHitResult) {
                const direction = raycast.getDirection()
                if (direction.getAxis().isHorizontal()) {
                    center = center.subtract(new Vec3d(0, radius, 0))
                } else if (direction == Direction.DOWN) {
                    center = center.subtract(new Vec3d(0, radius * 2 - 1, 0))
                } else {
                    center = center.subtract(new Vec3d(0, 1, 0))
                }
            }

            level.playSound(null, center.x(), center.y(), center.z(),'irons_spellbooks:spell.black_hole.cast', $SoundSource.AMBIENT, 4, 1)

            const blackHole = new $BlackHole(level, entity)
            blackHole.setRadius(radius)
            blackHole.setPercentageDamage(true)
            blackHole.ignoreProjectileProtection(true)
            blackHole.setDamage(0.2)
            blackHole.moveTo(center)
            level.addFreshEntity(blackHole)
        })
        
})
