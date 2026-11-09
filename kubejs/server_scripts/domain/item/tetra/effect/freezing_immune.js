// priority: 0

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function FreezingImmuneEntityDoDamage(customData, event) {
    if (event.source.getType() != 'freeze') return
    let entity = customData.entity
    if (!entity.isPlayer()) return
    if (TetraHurtTargetHas(customData, 'kubejs:freezing_immune')) event.cancel()
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:freezing_immune')
        .addStrategy('entity_do_damage', FreezingImmuneEntityDoDamage, -70)
)
