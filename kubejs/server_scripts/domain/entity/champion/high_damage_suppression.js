// priority: 500
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionHighDamageSuppressionEntityBeHurt(customData, event, championKey, championLevel) {
    const entity = event.entity
    if (event.amount <= 0) return

    const maxHealth = entity.getMaxHealth()
    if (maxHealth <= 0) return

    const threshold = maxHealth * 0.1 / championLevel

    if (event.amount > threshold) event.amount = event.amount * 0.2
}

RegistryChampionStrategy(
    new ChampionStrategyModel('high_damage_suppression')
        .addStrategy('entity_be_hurt', ChampionHighDamageSuppressionEntityBeHurt)
)
