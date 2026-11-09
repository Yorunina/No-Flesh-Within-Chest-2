// priority: 500
/**
 * 在器官结算前执行，保留本效果的物品读取时机。
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function FlameStrikeEntityDoDamage(customData, event) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && !TetraAttackFullCharge(event, sourceEntity)) return
    let heldItem = TetraAttackItem(event, sourceEntity)
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
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:flame_strike')
        .addStrategy('entity_do_damage_before', FlameStrikeEntityDoDamage, -30)
)