// priority: 500
const raiseOverlordUndeadSpawnPos = [new Vec3d(1, 0, 0), new Vec3d(-1, 0, 0), new Vec3d(0, 0, 1), new Vec3d(0, 0, -1)]
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('raise_overlord_undead')
        .setCastTime(40)
        .setCooldownSeconds(150)
        .setBaseManaCost(100)
        .setManaCostPerLevel(50)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(1)
        .setCastType('long')
        .setSchool('irons_spellbooks:blood')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .setEmptyCastData(new SummonedEntitiesCastData())
        .setRecastCount((spellLevel, entity) => {
            return 2
        })
        .onRecastFinished(ctx => {
            if (SummonManager.recastFinishedHelper(ctx.serverPlayer, ctx.recastInstance, ctx.recastResult, ctx.castDataSerializable)) {
                MagicHelper.MAGIC_MANAGER.addCooldown(ctx.serverPlayer, ctx.spell, ctx.recastInstance.getCastSource())
            }
        })
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            const spellLevel = ctx.getSpellLevel()
            const level = ctx.level
            const entity = ctx.entity
            const magicData = ctx.playerMagicData
            const spell = ctx.spell
            let recasts = magicData.getPlayerRecasts()
            if (!recasts["hasRecastForSpell(io.redspace.ironsspellbooks.api.spells.AbstractSpell)"](spell)) {
                let summonedEntitiesCastData = new SummonedEntitiesCastData()
                let summonTime = 20 * 60 * 10
                let playerChestArmor = entity.getItemBySlot('chest')
                let undeadChestArmor = playerChestArmor.isEmpty() ?
                    Item.of('minecraft:diamond_chestplate') : playerChestArmor
                let playerFeetArmor = entity.getItemBySlot('feet')
                let undeadFeetArmor = playerFeetArmor.isEmpty() ?
                    Item.of('minecraft:diamond_boots') : playerFeetArmor
                let playerHeadArmor = entity.getItemBySlot('head')
                let undeadHeadArmor = playerHeadArmor.isEmpty() ?
                    Item.of('minecraft:diamond_helmet') : playerHeadArmor
                let playerLegsArmor = entity.getItemBySlot('legs')
                let undeadLegsArmor = playerLegsArmor.isEmpty() ?
                    Item.of('minecraft:diamond_leggings') : playerLegsArmor

                let amplifier = spell.getSpellPower(ctx.spellLevel, entity)

                for (let i = 0; i < 4; i++) {
                    let undead = new $SummonedZombie(level, entity, true)

                    undead.finalizeSpawn(level, level.getCurrentDifficultyAt(undead.getOnPos()), 'mob_summoned', null, null)
                    undead.setItemSlot('chest', undeadChestArmor.enchant('minecraft:binding_curse', 1))
                    undead.setItemSlot('feet', undeadFeetArmor.enchant('minecraft:binding_curse', 1))
                    undead.setItemSlot('head', undeadHeadArmor.enchant('minecraft:binding_curse', 1))
                    undead.setItemSlot('legs', undeadLegsArmor.enchant('minecraft:binding_curse', 1))
                    undead.setDropChance('chest', 0.0)
                    undead.setDropChance('feet', 0.0)
                    undead.setDropChance('head', 0.0)
                    undead.setDropChance('legs', 0.0)
                    let targetPos = entity.getEyePosition().add(raiseOverlordUndeadSpawnPos[i])
                    let spawnPos = ISSUtils.moveToRelativeGroundLevel(level, targetPos, 10, 10)
                    undead.setPos(spawnPos.x(), spawnPos.y(), spawnPos.z())
                    undead.setYHeadRot(entity.getYHeadRot())
                    undead.setOldPosAndRot()
                    undead.setMaxHealth(10 * (1 + spellLevel) * amplifier)
                    undead.heal(undead.getMaxHealth())
                    undead.setAttributeBaseValue('minecraft:generic.attack_damage', 2 * (1 + spellLevel) * amplifier)
                    level.addFreshEntity(undead)
                    SummonManager.initSummon(entity, undead, summonTime, summonedEntitiesCastData)
                }
                let recastInstance = new RecastInstance(spell.spellId, spellLevel, spell.getRecastCount(spellLevel, entity), summonTime, ctx.castSource, summonedEntitiesCastData)
                recasts.addRecast(recastInstance, magicData)
            }

        })
})

