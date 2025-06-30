// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('dream_of_fireball')
        .setCastTime(40)
        .setCooldownSeconds(25)
        .setBaseManaCost(150)
        .setManaCostPerLevel(25)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(1)
        .setCastType('long')
        .setSchool('kubejs:dream')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const entity = ctx.entity
            const level = ctx.level
            const orb = new $FireBomb(level, entity)

            let damage = 10
            let explosionRadius = 30
            let spellPower = entity.getAttributeValue('irons_spellbooks:spell_power')
            let schoolSpellPower = entity.getAttributeValue('kubejs:dream_spell_power')

            damage = damage * spellPower * schoolSpellPower
            orb.setPos(entity.position().add(0, entity.getEyeHeight() - orb.getBoundingBox().getYsize() * 0.5, 0).add(entity.getForward()))
            orb.shoot(entity.getLookAngle())
            orb.setDeltaMovement(orb.getDeltaMovement().add(0, 0.2, 0))
            orb.setExplosionRadius(explosionRadius)
            orb.setAoeDamage(damage)
            orb.setDamage(damage)

            level.addFreshEntity(orb)
        })
})

