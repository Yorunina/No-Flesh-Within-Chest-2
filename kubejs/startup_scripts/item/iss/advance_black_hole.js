// priority: 500
// 黑洞 (Black Hole) - 由 BlackHoleSpell 转换而来
// 注意: 原版 stopSoundOnCancel() 不在 irons_spells_js builder API 中, 无法设置
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('advance_black_hole')
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
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const level = ctx.level
            const entity = ctx.entity
            const spell = ctx.spell
            const spellLevel = ctx.spellLevel

            // 计算半径与伤害 (对应原版 getRadius / getDamage)
            const spellPower = spell.getSpellPower(spellLevel, entity)
            const radius = (2 * spellLevel + 4) + (0.125 * spellPower)
            const damage = spellPower * 2

            // 射线检测目标位置
            const raycast = ISSUtils.raycastForEntity(level, entity, 16 + radius * 1.5, true)
            let center = raycast.getLocation()

            // 根据方块命中面调整中心位置
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

            // 在目标位置播放施法音效
            level.playSound(null, center.x(), center.y(), center.z(),
                'irons_spellbooks:spell.black_hole.cast', $SoundSource.AMBIENT, 4, 1)

            // 创建黑洞实体
            const blackHole = new $BlackHole(level, entity)
            blackHole.setRadius(radius)
            blackHole.setDamage(damage)
            blackHole.moveTo(center)
            level.addFreshEntity(blackHole)
        })
        .setStopSoundOnCancel(true)
})
