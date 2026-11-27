// priority: 500
/**
 * @param {Object} customData
 * @param {Internal.LivingDamageEvent} event
 */
function FlameStrikeEntityFinalDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && !TetraAttackFullCharge(event, sourceEntity)) return
    if (effectSource.efficiency <= 0 || effectSource.level <= 0) return
    let fireTicks = targetEntity.getRemainingFireTicks()
    let needTicks = effectSource.level * 20 * 10
    if (fireTicks <= needTicks) return
    let damage =  fireTicks / 20 * effectSource.efficiency * 0.5
    targetEntity.invulnerableTime = 0
    targetEntity.attack(sourceEntity.damageSources().onFire(), damage)
    targetEntity.setRemainingFireTicks(targetEntity.getRemainingFireTicks() - needTicks)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:flame_strike')
        .addOnlyStrategy('entity_final_damage', FlameStrikeEntityFinalDamage)
)