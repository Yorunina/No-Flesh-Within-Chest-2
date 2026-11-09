// priority: 0

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function DefenseEntityDoDamage(customData, event) {
    let entity = customData.entity
    if (entity.level.isClientSide()) return

    let defense = Math.min(TetraHurtTargetLevel(customData, 'kubejs:defense'), 100)
    if (defense <= 0) return

    event.amount = event.amount * (1 - defense / 100)
    if (event.amount < 0.01) event.amount = 0.01
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:defense')
        .addStrategy('entity_do_damage', DefenseEntityDoDamage, -40)
)
