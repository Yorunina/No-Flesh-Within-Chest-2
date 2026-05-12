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
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:devour_blood')
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:devour_blood')
    if (effectEfficiency <= 0 || effectLevel <= 0) return
    
    if (Math.random() > effectLevel * 0.025) return
    const foodData = sourceEntity.getFoodData()
    let saturationLevel = foodData.getSaturationLevel()
    foodData.setSaturation(saturationLevel + effectEfficiency * 0.1)
})