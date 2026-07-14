// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    // todo
    event.create('advance_raise_hell')
        .setCooldownSeconds(25)
        .setBaseManaCost(90)
        .setManaCostPerLevel(0)
        .setBaseSpellPower(0)
        .setSpellPowerPerLevel(0)
        .setCastTime(20)
        .setCastType('long')
        .setSchool('irons_spellbooks:fire')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .setAllowLooting(false)
        .setStartSound('irons_spellbooks:spell.raise_hell.prepare')
        .setFinishSound('irons_spellbooks:entity.fire_eruption.slam')
        .setCastStartAnimation('irons_spellbooks:overhead_two_handed_swing', true, true)
        .setCanBeInterrupted((player) => false)
        .setRecastCount((spellLevel, entity) => spellLevel)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const spell = ctx.spell
            const spellLevel = ctx.spellLevel
            const playerMagicData = ctx.playerMagicData
            const castSource = ctx.castSource

            if (!playerMagicData.getPlayerCooldowns().isOnCooldown(spell) &&
                !playerMagicData.getPlayerRecasts().hasRecastForSpell(spell.getSpellId())) {
                const recast = new RecastInstance(spell.getSpellId(), spellLevel, spell.getRecastCount(spellLevel, entity), 80, castSource, null)
                playerMagicData.getPlayerRecasts().addRecast(recast, playerMagicData)
            }

            const radius = 8
            const range = 1.7
            const eyePos = entity.getEyePosition()
            const forward = entity.getForward()
            const rayEnd = eyePos.add(forward.multiply(range, 0, range))
            const raycast = ISSUtils.raycastForBlock(level, eyePos, rayEnd, $ClipContext.Fluid.NONE)
            const hitLocation = ISSUtils.moveToRelativeGroundLevel(level, raycast.getLocation(), 3)

            const aoe = new $FireEruptionAoe(level, radius)
            aoe.setOwner(entity)
            aoe.setDamage(spell.getSpellPower(spellLevel, entity) + ISSUtils.getWeaponDamage(entity))
            aoe.moveTo(hitLocation)
            level.addFreshEntity(aoe)

            CameraShakeManager.addCameraShake(
                new CameraShakeData(level, 20 + radius, hitLocation, radius * 2 + 5)
            )
        })
        .getEffectiveCastTime(ctx => {
            return ctx.spell.getCastTime(ctx.spellLevel)
        })
})
