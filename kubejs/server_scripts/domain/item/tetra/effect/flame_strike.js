// priority: 500
/**
 * 造成伤害（未过护甲结算）节点，适合用于结算造成伤害效果
 */
NativeEvents.onEvent($LivingHurtEvent, /** @param {Internal.LivingHurtEvent} event */ event => {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && IsFullChargeAttck(sourceEntity)) return
    let heldItem = sourceEntity.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:flame_strike')
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:flame_strike')
    if (effectEfficiency <= 0 || effectLevel <= 0) return
    let fireTicks = targetEntity.getRemainingFireTicks()
    let needTicks = effectLevel * 20 * 10
    if (fireTicks <= needTicks) return
    let damage =  fireTicks / 20 * effectEfficiency * 0.5
    targetEntity.invulnerableTime = 0
    targetEntity.attack(sourceEntity.damageSources().onFire(), damage)
    targetEntity.setRemainingFireTicks(targetEntity.getRemainingFireTicks() - needTicks)
})