// priority: 500
/**
* @param {ChampionEventCustomData} customData
* @param {Internal.LivingEvent$LivingTickEvent} event 
* @param {string} championKey
* @param {number} championLevel
*/
function TestEntityTick(customData, event, championKey, championLevel) {
    ApplyAuraEffect(event.entity, 16,
        (mob) => !mob.isPlayer() && mob.isMonster(),
        (mob) => mob.setGlowing(true),
        (mob) => mob.setGlowing(false)
    )
}

RegistryChampionStrategy(
    new ChampionStrategyModel('test')
        .addStrategy('entity_tick', TestEntityTick)
)
