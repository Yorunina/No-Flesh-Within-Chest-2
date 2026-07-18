// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('ice_tomb')
        .setCooldownSeconds(15)
        .setBaseManaCost(30)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(1)
        .setCastTime(0)
        .setCastType('instant')
        .setSchool('irons_spellbooks:ice')
        .setMinRarity('uncommon')
        .setMaxLevel(1)
        .setCastStartAnimation('irons_spellbooks:self_cast_two_hands', true, false)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity

            const healing = entity.getMaxHealth() / 15
            const duration = 20 * 15

            const iceTombEntity = new $IceTombEntity(level, entity)
            iceTombEntity.setHealth(entity.getMaxHealth())
            iceTombEntity.moveTo(entity.position())
            iceTombEntity.setDeltaMovement(entity.getDeltaMovement())
            iceTombEntity.setHealing(healing)
            iceTombEntity.setLifetime(duration)
            level.addFreshEntity(iceTombEntity)
            entity.startRiding(iceTombEntity, true)
        })
})
