// priority: 500

/**
 * 从双手选择霜步等级较高的模块物品。
 * @param {Internal.Player} player
 * @returns {{level: number, efficiency: number}|null}
 */
function FrostStepFind(player) {
    let best = null
    for (let stack of [player.getMainHandItem(), player.getOffhandItem()]) {
        if (!TetraJSUtils.isModularItem(stack.getItem())) continue
        let item = stack.getItem()
        let level = item.getEffectLevel(stack, 'kubejs:frost_step')
        if (level > 0 && (!best || level > best.level)) {
            best = {level: level, efficiency: item.getEffectEfficiency(stack, 'kubejs:frost_step')}
        }
    }
    return best
}

/**
 * 沿身后扫描，受阻则尝试身前；没有安全落点时返回空值。
 * @param {Internal.Player} player
 * @param {number} distance
 * @returns {Internal.Vec3|null}
 */
function FrostStepFindLanding(player, distance) {
    if (!isFinite(distance) || distance < 0.25) return null
    let look = player.getLookAngle()
    let length = Math.sqrt(look.x() * look.x() + look.z() * look.z())
    let bx = isFinite(length) && length >= 0.0001 ? -look.x() / length : 0
    let bz = isFinite(length) && length >= 0.0001 ? -look.z() / length : 1
    let scan = (direction, limit) => {
        let landing = null
        for (let step = 0.25; step <= limit + 0.000001; step += 0.25) {
            let x = player.x + bx * step * direction
            let z = player.z + bz * step * direction
            if (!CanTetraTeleportTo(player, x, player.y, z, false)) break
            if (player.level.getBlock(Math.floor(x), Math.floor(player.y), Math.floor(z)).id == 'minecraft:lava') break
            for (let y = Math.floor(player.y) + 1; y >= Math.floor(player.y) - 2; y--) {
                let candidate = FindTetraSupportedLanding(player, x, y, z)
                if (candidate && player.level.getBlock(Math.floor(x), Math.floor(candidate.y()), Math.floor(z)).id != 'minecraft:lava') {
                    landing = candidate
                    break
                }
            }
        }
        return landing
    }
    return scan(1, distance) || scan(-1, Math.min(1.5, distance))
}

/**
 * AttributesLib 成功闪避后生成冰分身并尝试安全后撤。
 * @param {Internal.Player} player
 */
function FrostStepTrigger(player) {
    let effect = FrostStepFind(player)
    if (!effect) return
    let now = Date.now()
    let data = player.persistentData
    if (data.contains('kubejs:frost_step_cd') && now - data.getLong('kubejs:frost_step_cd') < 500) return
    data.putLong('kubejs:frost_step_cd', now)
    let clone = new $FrozenHumanoid(player.level, player)
    clone.setShatterDamage(5)
    clone.setDeathTimer(effect.level * 20)
    player.level.addFreshEntity(clone)
    $ISSUtils.performTaunt(clone, 10, entity => entity != player)
    let landing = FrostStepFindLanding(player, effect.efficiency)
    if (!landing) return
    let spell = SpellRegistry['getSpell(java.lang.String)']('irons_spellbooks:frost_step')
    $ISSUtils.handleSpellTeleport(spell, player, landing)
}

/**
 * @param {Object} customData
 * @param {Internal.LivingAttackEvent} event
 */
function FrostStepEntityAttackCanceled(customData, event) {
    let player = event.entity
    if (!event.isCanceled() || player.level.isClientSide() || !player.isPlayer()) return
    if ($ALAttributeEvents.isDodging(player)) FrostStepTrigger(player)
}

/**
 * @param {Object} customData
 * @param {Internal.ProjectileImpactEvent} event
 */
function FrostStepProjectileImpactCanceled(customData, event) {
    if (!event.isCanceled() || !(event.rayTraceResult instanceof $EntityHitResult)) return
    let player = event.rayTraceResult.entity
    if (player.level.isClientSide() || !player.isPlayer()) return
    if ($ALAttributeEvents.isDodging(player)) FrostStepTrigger(player)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:frost_step')
        .addStrategy('entity_attack_canceled', FrostStepEntityAttackCanceled)
        .addStrategy('projectile_impact_canceled', FrostStepProjectileImpactCanceled)
)
