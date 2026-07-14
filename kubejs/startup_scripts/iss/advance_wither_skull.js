// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('advance_wither_skull')
        .setCooldownSeconds(3)
        .setBaseManaCost(20)
        .setManaCostPerLevel(10)
        .setBaseSpellPower(12)
        .setSpellPowerPerLevel(1)
        .setCastType('instant')
        .setSchool('irons_spellbooks:blood')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const spell = ctx.spell
            const entity = ctx.entity
            const level = ctx.level
            const spellLevel = ctx.spellLevel
            const weaknessEffect = entity.getEffect('minecraft:weakness')
            let weaknessDuration = 0
            let weaknessAmplifier = 0
            if (weaknessEffect) {
                weaknessDuration = weaknessEffect.getDuration()
                weaknessAmplifier = weaknessEffect.getAmplifier()
            }
            let damage = spell.getSpellPower(spellLevel, entity) * (1 + weaknessDuration / 20 * weaknessAmplifier)
            const skull = new $WitherSkullProjectile(entity, level, 0.5, damage)
            let spawn = entity.getEyePosition().add(entity.getForward())
            let px = spawn.x()
            let py = spawn.y() - skull.getBoundingBox().getYsize() / 2
            let pz = spawn.z()
            skull.setPosRaw(px, py, pz)
            skull.setOldPosAndRot()
            skull.callReapplyPosition()
            level.addFreshEntity(skull)
        })
})
