// priority: 0

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function ArmorEntityDoDamage(customData, event) {
    let entity = customData.entity
    if (entity.level.isClientSide()) return

    let armor = TetraHurtTargetLevel(customData, 'kubejs:armor')
    if (armor <= 0) return

    event.amount = event.amount - armor / 10
    if (event.amount < 0.01) event.amount = 0.01
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:armor')
        .addStrategy('entity_do_damage', ArmorEntityDoDamage, -10)
)
