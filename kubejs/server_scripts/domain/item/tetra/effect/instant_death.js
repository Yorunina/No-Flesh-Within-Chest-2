// priority: 0

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function InstantDeathEntityDoDamage(customData, event) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = TetraHurtSourceEntity(customData)
    let targetEntity = customData.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    let effectLevel = TetraHurtSourceLevel(customData, 'kubejs:instant_death')
    if (effectLevel < 1) return
    targetEntity.health = 0
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:instant_death')
        .addStrategy('entity_do_damage', InstantDeathEntityDoDamage, -80)
)
