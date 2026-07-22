// priority: 500
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionLowFreqProtectionEntityBeHurt(customData, event, championKey, championLevel) {
    const entity = event.entity
    if (event.amount <= 0) return

    const level = entity.level
    const resetTicks = championLevel * 20

    const persistentData = entity.persistentData
    const data = persistentData.getCompound('championData') ?? new $CompoundTag()
    let counter = data.getInt('counter')
    const lastHitTick = data.getLong('lastHitTick')

    if (counter > 0 && level.time - lastHitTick >= resetTicks) counter = 0

    event.amount = Math.min(event.amount, Math.pow(2, counter))

    data.putInt('counter', Math.min(counter + 1, 30))
    data.putLong('lastHitTick', level.time)
    persistentData.put('championData', data)
}

RegistryChampionStrategy(
    new ChampionStrategyModel('low_freq_protection')
        .addStrategy('entity_be_hurt', ChampionLowFreqProtectionEntityBeHurt)
)
