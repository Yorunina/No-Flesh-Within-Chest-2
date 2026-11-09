// priority: 500
/**
 * 在器官结算前执行，保留本效果的物品读取时机。
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function DevourBloodEntityDoDamage(customData, event) {
    /**@type {Player} */
    const sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isPlayer()) return
    if (!TetraAttackFullCharge(event, sourceEntity)) return
    let heldItem = TetraAttackItem(event, sourceEntity)
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
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:devour_blood')
        .addStrategy('entity_do_damage_before', DevourBloodEntityDoDamage, -20)
)