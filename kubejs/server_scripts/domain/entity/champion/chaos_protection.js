// priority: 500
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionChaosProtectionEntityBeHurt(customData, event, championKey, championLevel) {
    if (event.amount <= 0) return

    const entity = event.entity
    const activeEffects = entity.getActiveEffects()
    const effectCount = activeEffects ? activeEffects.size() : 0
    if (effectCount <= championLevel) {
        event.amount *= 0.1
    }
}

RegistryChampionStrategy(
    new ChampionStrategyModel('chaos_protection')
        .addStrategy('entity_be_hurt', ChampionChaosProtectionEntityBeHurt)
)
