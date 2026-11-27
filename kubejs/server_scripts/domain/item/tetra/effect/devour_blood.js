// priority: 500
/**
 * 在器官结算前执行，保留本效果的物品读取时机。
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function DevourBloodEntityDoDamage(customData, event, effectSource) {
    /**@type {Player} */
    const sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isPlayer()) return
    if (!TetraAttackFullCharge(event, sourceEntity)) return
    if (effectSource.efficiency <= 0 || effectSource.level <= 0) return
    
    if (Math.random() > effectSource.level * 0.025) return
    const foodData = sourceEntity.getFoodData()
    let saturationLevel = foodData.getSaturationLevel()
    foodData.setSaturation(saturationLevel + effectSource.efficiency * 0.1)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:devour_blood')
        .addStrategy('entity_damage_first', DevourBloodEntityDoDamage)
)
