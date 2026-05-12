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
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:burns')
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:burns')
    if (effectEfficiency <= 0 || effectLevel <= 0) return
    if (effectLevel >= 10) {
        targetEntity.setRemainingFireTicks(targetEntity.getRemainingFireTicks() + Math.floor(effectEfficiency * (effectLevel / 10)) * 20)
    } else if (effectLevel > 0 && effectLevel * 10 > Math.random() * 100) {
        targetEntity.setRemainingFireTicks(targetEntity.getRemainingFireTicks() + effectEfficiency * 20)
    }
})

