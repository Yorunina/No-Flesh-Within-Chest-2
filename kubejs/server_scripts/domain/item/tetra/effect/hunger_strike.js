// priority: 500
/**
 * 造成伤害（未过护甲结算）节点，适合用于结算造成伤害效果
 */
NativeEvents.onEvent($LivingHurtEvent, /** @param {Internal.LivingHurtEvent} event */ event => {
    /**@type {Player} */
    const sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isPlayer()) return
    if (IsFullChargeAttck(sourceEntity)) return
    let heldItem = sourceEntity.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:hunger_strike')
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:hunger_strike')
    if (effectEfficiency <= 0) return
    if (sourceEntity.getFoodLevel() == 0) {
        sourceEntity.invulnerableTime = 0
        sourceEntity.attack(sourceEntity.damageSources().starve(), sourceEntity.getMaxHealth() * effectEfficiency * 0.1)
        return
    }

    if (effectLevel > 0) sourceEntity.addExhaustion(effectLevel)
    event.setAmount(event.getAmount() + sourceEntity.getMaxHealth() * effectEfficiency * 0.1)
})