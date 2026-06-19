// priority: 500
/**
* @param {ChampionEventCustomData} customData
* @param {Internal.LivingEvent$LivingTickEvent} event 
* @param {string} championKey
* @param {number} championLevel
*/
function TestEntityTick(customData, event, championKey, championLevel) {
    const entity = event.entity
    entity.attack(1)
}

RegistryChampionStrategy(
    new ChampionStrategyModel('test')
        .addStrategy('entity_tick', TestEntityTick)
)
