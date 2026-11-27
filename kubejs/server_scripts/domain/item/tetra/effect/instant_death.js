// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function InstantDeathEntityDoDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    let targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (effectSource.level < 1) return
    targetEntity.health = 0
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:instant_death')
        .addOnlyStrategy('entity_do_damage', InstantDeathEntityDoDamage)
)
