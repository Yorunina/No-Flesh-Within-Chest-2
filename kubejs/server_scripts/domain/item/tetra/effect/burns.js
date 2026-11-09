// priority: 500
/**
 * 在器官结算前执行，保留本效果的物品读取时机。
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function BurnsEntityDoDamage(customData, event) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && !TetraAttackFullCharge(event, sourceEntity)) return
    let heldItem = TetraAttackItem(event, sourceEntity)
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
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:burns')
        .addStrategy('entity_do_damage_before', BurnsEntityDoDamage, -10)
)

