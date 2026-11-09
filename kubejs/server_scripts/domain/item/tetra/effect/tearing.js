// priority: 0

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function TearingEntityDoDamage(customData, event) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = TetraHurtSourceEntity(customData)
    let targetEntity = customData.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (!TetraAttackIsMelee(event, sourceEntity)) return
    if (!TetraAttackFullCharge(event, sourceEntity)) return
    if (event.source.getType() == 'generic') return
    let effectLevel = TetraHurtSourceLevel(customData, 'kubejs:tearing')
    let effectEfficiency = TetraHurtSourceEfficiency(customData, 'kubejs:tearing')
    let chance = Math.max(0, Math.min(1, effectEfficiency / 100))
    if (Math.random() >= chance) return
    let threshold = targetEntity.maxHealth * effectLevel / 1000
    if (threshold <= 0) return
    if (event.amount < threshold) event.amount = threshold
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:tearing')
        .addStrategy('entity_do_damage', TearingEntityDoDamage, -140)
)
