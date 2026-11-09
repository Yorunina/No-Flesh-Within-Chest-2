// priority: 500
/**
 * 在器官结算前执行，保留本效果的物品读取时机。
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function HungerStrikeEntityDoDamage(customData, event) {
    /**@type {Player} */
    const sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isPlayer()) return
    if (!TetraAttackFullCharge(event, sourceEntity)) return
    let heldItem = TetraAttackItem(event, sourceEntity)
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
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:hunger_strike')
        .addStrategy('entity_do_damage_before', HungerStrikeEntityDoDamage, -40)
)