// priority: 500
const ChampionHealthBoostHealthUpUUID = UUID.fromString('8FD7257D-E8F8-4432-96B2-5C1ACCB83BB2')
const ChampionHealthBoostHealthUpIdentifier = 'ChampionHealthBoostHealthUp'
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.EntitySpawnedEventJS} event 
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionHealthBoostEntitySpawned(customData, event, championKey, championLevel) {
    /**@type {Internal.LivingEntity} */
    const entity = event.entity
    const attribute = entity.getAttribute('minecraft:generic.max_health')
    if (!attribute) return
    attribute.addPermanentModifier(new $AttributeModifier(ChampionHealthBoostHealthUpUUID, ChampionHealthBoostHealthUpIdentifier, Math.pow(2, championLevel), $Operation.MULTIPLY_BASE))
    entity.heal(entity.getMaxHealth())
}

RegistryChampionStrategy(
    new ChampionStrategyModel('health_boost')
        .addStrategy('entity_spawned', ChampionHealthBoostEntitySpawned)
)

