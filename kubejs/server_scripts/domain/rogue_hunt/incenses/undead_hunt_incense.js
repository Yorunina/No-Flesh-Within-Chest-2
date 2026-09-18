// priority: 500
const RogueHuntIncenseSpawns = new WeightRandomModel()
    .addWeightRandom('minecraft:zombie', 80)
    .addWeightRandom('minecraft:skeleton', 20)

/**
 * 本香的刷怪节奏和上限。
 * @param {CuriosEventCustomData} customData
 * @param {Internal.SimplePlayerEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function UndeadHuntIncensePlayerTick(customData, event, curiosItem) {
    const player = event.player
    const level = event.level

    if (level.dimension != ROGUE_HUNT_DIM || level.difficulty.key == 'peaceful') return

    // 刷新频率
    if (player.age % (30 * 20) != 0) return

    let remain = 60 - CountRogueHuntMobs(level, player)
    
    if (remain <= 0) return

    const rank = GetPlayerRank(player)

    // 数量和种类控制
    let n = Math.floor(
        Math.min(
            Math.min(4 + rank / 5, 20), remain
        )
    )
    for (let i = 0; i < n; i++) {
        let type = RogueHuntIncenseSpawns.getWeightRandomObj()
        let mob = level.createEntity(type)
        if (!mob) continue
        PlaceRogueHuntMobAround(mob, player, 16, 32, rank)

        // 属性控制
        if (rank > 0) {
            let healthAttr = mob.getAttribute('minecraft:generic.max_health')
            healthAttr.addPermanentModifier(new $AttributeModifier(RogueHuntHealthUUID, 'RogueHuntHealth', rank, 'multiply_base'))

            let attackAttr = mob.getAttribute('minecraft:generic.attack_damage')
            if (attackAttr) attackAttr.addPermanentModifier(new $AttributeModifier(RogueHuntAttackUUID, 'RogueHuntAttack', rank * 0.05, 'multiply_base'))

            let armorAttr = mob.getAttribute('minecraft:generic.armor')
            if (armorAttr) armorAttr.addPermanentModifier(new $AttributeModifier(RogueHuntArmorUUID, 'RogueHuntArmor', rank, 'addition'))
        } else {
            let healthAttr = mob.getAttribute('minecraft:generic.max_health')
            healthAttr.setBaseValue(1)
        }

        mob.setHealth(mob.getMaxHealth())
        AggroRogueHuntMob(mob, player)
        mob.spawn()
    }
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:undead_hunt_incense')
    .addStrategy('player_tick', UndeadHuntIncensePlayerTick)
)
