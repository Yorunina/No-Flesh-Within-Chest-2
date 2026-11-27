// priority: 500
/**
 * @param {Object} customData
 * @param {Internal.LivingDamageEvent} event
 */
function HungerStrikeEntityFinalDamage(customData, event, effectSource) {
    /**@type {Player} */
    const sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isPlayer()) return
    if (!TetraAttackFullCharge(event, sourceEntity)) return
    if (effectSource.efficiency <= 0) return
    if (sourceEntity.getFoodLevel() == 0) {
        sourceEntity.invulnerableTime = 0
        sourceEntity.attack(sourceEntity.damageSources().starve(), sourceEntity.getMaxHealth() * effectSource.efficiency * 0.1)
        return
    }

    if (effectSource.level > 0) sourceEntity.addExhaustion(effectSource.level)
    event.setAmount(event.getAmount() + sourceEntity.getMaxHealth() * effectSource.efficiency * 0.1)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:hunger_strike')
        .addStrategy('entity_final_damage', HungerStrikeEntityFinalDamage)
)