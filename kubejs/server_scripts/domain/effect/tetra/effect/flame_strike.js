// priority: 500
/**
 * 造成伤害（未过护甲结算）节点，适合用于结算造成伤害效果
 */
NativeEvents.onEvent($LivingHurtEvent, /** @param {Internal.LivingHurtEvent} event */ event => {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    let heldItem = sourceEntity.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:flame_strike')
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:flame_strike')
    if (effectEfficiency <= 0 || effectLevel <= 0) return
    let fireTicks = targetEntity.getRemainingFireTicks()
    if (fireTicks <= effectLevel * 20 * 30) return
    let damage =  fireTicks / 20 * effectEfficiency * 0.2
    targetEntity.attack(targetEntity.damageSources().onFire(), damage)
})