// priority: 0

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function LightningImmuneEntityDoDamage(customData, event) {
    if (event.source.getType() != 'lightningBolt') return
    let entity = customData.entity
    if (!entity.isPlayer()) return
    if (TetraHurtTargetHas(customData, 'kubejs:lightning_immune')) event.cancel()
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:lightning_immune')
        .addStrategy('entity_do_damage', LightningImmuneEntityDoDamage, -90)
)
