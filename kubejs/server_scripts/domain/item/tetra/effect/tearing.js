// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function TearingEntityDoDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    let targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (!TetraAttackIsMelee(event, sourceEntity)) return
    if (!TetraAttackFullCharge(event, sourceEntity)) return
    if (event.source.getType() == 'generic') return
    let chance = Math.max(0, Math.min(1, effectSource.efficiency / 100))
    if (Math.random() >= chance) return
    let threshold = targetEntity.maxHealth * effectSource.level / 1000
    if (threshold <= 0) return
    if (event.amount < threshold) event.amount = threshold
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:tearing')
        .addStrategy('entity_do_damage', TearingEntityDoDamage)
)
