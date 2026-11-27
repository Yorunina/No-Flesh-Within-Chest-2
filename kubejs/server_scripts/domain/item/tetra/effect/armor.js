// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.LivingDamageEvent} event
 */
function ArmorEntityBeHurt(customData, event, effectSource) {
    if (effectSource.level <= 0) return

    event.amount = Math.max(0, event.amount - effectSource.level / 10)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:armor')
        .addOnlyStrategy('entity_be_hurt', ArmorEntityBeHurt)
)
