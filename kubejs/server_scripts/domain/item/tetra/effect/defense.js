// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.LivingDamageEvent} event
 */
function DefenseEntityBeHurt(customData, event, effectSource) {
    let defense = Math.min(effectSource.level, 100)
    if (defense <= 0) return

    event.amount = event.amount * (1 - defense / 100)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:defense')
        .addOnlyStrategy('entity_be_hurt', DefenseEntityBeHurt)
)
