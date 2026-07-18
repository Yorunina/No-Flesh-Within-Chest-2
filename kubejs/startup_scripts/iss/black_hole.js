// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('black_hole')
        .setCooldownSeconds(60)
        .setBaseManaCost(50)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(0)
        .setCastTime(60)
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
            const radius = 32
            const raycast = ISSUtils.raycastForEntity(level, entity, 48, true)
            let center = raycast.getLocation()
            level.playSound(null, center.x(), center.y(), center.z(), 'irons_spellbooks:spell.black_hole.cast', 'ambient', 4, 1)

            const blackHole = new $BlackHole(level, entity)
            blackHole.setRadius(radius)
            blackHole.setPercentageDamage(true)
            blackHole.ignoreProjectileProtection(true)
            blackHole.setDamage(0.05)
            blackHole.setPos(center)
            level.addFreshEntity(blackHole)
        })
})
