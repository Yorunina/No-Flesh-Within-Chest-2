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
        .setSchool('kubejs:candy')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const entity = ctx.entity
            const level = ctx.level
            const eyePosition = entity.getEyePosition()
            const fireBallEntity = new $MagicFireball(level, entity)
            let damage = 10
            let explosionRadius = ctx.spellLevel + 2
            if (entity.hasEffect('kubejs:sweet_dream')) {
                let sweetDreamEffect = entity.getEffect('kubejs:sweet_dream')
                damage = damage + sweetDreamEffect.getDuration() / 20
                explosionRadius = explosionRadius + sweetDreamEffect.getAmplifier() * 2
            }
            let spellPower = entity.getAttributeValue('irons_spellbooks:spell_power')
            let schoolSpellPower = entity.getAttributeValue('kubejs:candy_spell_power')

            damage = damage * spellPower * schoolSpellPower
            fireBallEntity.setDamage(damage)
            fireBallEntity.setExplosionRadius(explosionRadius)
            fireBallEntity.setPos(eyePosition.add(entity.getForward()).subtract(0, fireBallEntity.getBbHeight() / 2, 0))
            fireBallEntity.shoot(entity.getLookAngle())
            
            level.addFreshEntity(fireBallEntity)
        })
})

