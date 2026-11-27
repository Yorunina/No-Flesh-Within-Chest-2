// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function FreezingImmuneEntityBeHurt(customData, event, effectSource) {
    if (event.source.getType() != 'freeze') return
    if (!event.entity.isPlayer()) return
    if (effectSource.level > 0) event.setCanceled(true)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:freezing_immune')
        .addOnlyStrategy('entity_be_hurt', FreezingImmuneEntityBeHurt)
)
