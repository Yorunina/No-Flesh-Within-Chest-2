// priority: 500

/**
 * 用冰棺冻结目标十秒。
 * @param {Internal.LivingEntity} target
 */
function FrostBulwarkFreeze(target) {
    if (!target || !target.isLiving() || !target.isAlive() || target.isPassenger()) return
    let tomb = new $IceTombEntity(target.level, target)
    tomb.moveTo(target.position())
    tomb.setDeltaMovement(target.getDeltaMovement())
    tomb.setEvil()
    tomb.setLifetime(200)
    target.level.addFreshEntity(tomb)
    target.startRiding(tomb, true)
}

/**
 * @param {Object} customData
 * @param {Internal.ShieldBlockEvent} event
 */
function FrostBulwarkShieldBlock(customData, event) {
    let defender = event.entity
    if (defender.level.isClientSide() || event.blockedDamage <= 0) return
    let shield = defender.getUseItem()
    let item = shield.getItem()
    if (!TetraJSUtils.isModularItem(item)) return
    if (Math.random() >= item.getEffectLevel(shield, 'kubejs:frost_bulwark') / 100) return
    let attacker = event.damageSource.actual || event.damageSource.immediate
    if (!attacker || attacker == defender) return
    FrostBulwarkFreeze(attacker)
}

/**
 * @param {Object} customData
 * @param {Internal.ItemCooldownStartedEventJS} event
 */
function FrostBulwarkItemCooldownStarted(customData, event) {
    let player = event.player
    let shield = null
    for (let stack of [player.getUseItem(), player.mainHandItem, player.offHandItem]) {
        if (stack.getItem() != event.item || !TetraJSUtils.isModularItem(stack.getItem())) continue
        if (stack.getItem().getEffectLevel(stack, 'kubejs:frost_bulwark') <= 0) continue
        shield = stack.copy()
        break
    }
    if (!shield) return
    let radius = shield.getItem().getEffectEfficiency(shield, 'kubejs:frost_bulwark')
    let targets = GetLivingWithinRadiusVec3d(player.level, player.position(), radius,
        (level, entity) => !entity.isPlayer() && entity.isMonster() && !entity.isPassenger() && !entity.isSpectator())
    targets.forEach(target => FrostBulwarkFreeze(target))
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:frost_bulwark')
        .addStrategy('shield_block', FrostBulwarkShieldBlock)
        .addStrategy('item_cooldown_started', FrostBulwarkItemCooldownStarted)
)
