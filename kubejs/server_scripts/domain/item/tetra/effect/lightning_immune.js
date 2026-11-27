// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function LightningImmuneEntityBeHurt(customData, event, effectSource) {
    if (event.source.getType() != 'lightningBolt') return
    if (!event.entity.isPlayer()) return
    if (effectSource.level > 0) event.setCanceled(true)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:lightning_immune')
        .addOnlyStrategy('entity_be_hurt', LightningImmuneEntityBeHurt)
)
