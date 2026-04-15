// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('advance_devour')
        .setCooldownSeconds(20)
        .setBaseManaCost(50)
        .setManaCostPerLevel(20)
        .setBaseSpellPower(5)
        .setSpellPowerPerLevel(1)
        .setCastType('instant')
        .setSchool('irons_spellbooks:blood')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .checkPreCastConditions(ctx => {
            return ISSUtils.preCastTargetHelper(ctx.level, ctx.entity, ctx.playerMagicData, ctx.spell, 9, 0.1)
        })
        .onCast(ctx => {
            const level = ctx.level
            const entity = ctx.entity
            const spell = ctx.spell
            let targetCastData = ctx.playerMagicData.getAdditionalCastData()
            if (!(targetCastData instanceof TargetEntityCastData)) return
            let targetEntity = targetCastData.getTarget(level)
            if (!targetEntity) return
            let devourEntity = new $DevourJaw(level, entity, targetEntity)
            let ccIns = entity.getChestCavityInstance()
            let filtration = Math.max(ccIns.getOrganScore('chestcavity:filtration'), 1)
            let damage = spell.getSpellPower(ctx.spellLevel, entity) * filtration
            devourEntity.setPos(targetEntity.position())
            devourEntity.setYHeadRot(entity.getYHeadRot())
            devourEntity.setDamage(damage)
            devourEntity.vigorLevel = damage * 0.25 - 1
            level.addFreshEntity(devourEntity)
            if (entity instanceof $Player) {
                RecoverPlayerHungerAndSaturation(entity, filtration)
            }
        })
        .getDamageSource(ctx => {
            return $SpellDamageSource.source(ctx.projectile, ctx.attacker, ctx.spell).setLifestealPercent(0.2)
        })
})
