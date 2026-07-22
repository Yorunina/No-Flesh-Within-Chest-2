// priority: 500
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionLowDamageRestrictionEntityBeHurt(customData, event, championKey, championLevel) {
    const entity = event.entity
    if (event.amount <= 0) return

    const maxHealth = entity.getMaxHealth()
    if (maxHealth <= 0) return

    const threshold = maxHealth * 0.01 * championLevel
    if (event.amount < threshold) event.amount = 0
}

RegistryChampionStrategy(
    new ChampionStrategyModel('low_damage_restriction')
        .addStrategy('entity_be_hurt', ChampionLowDamageRestrictionEntityBeHurt)
)
