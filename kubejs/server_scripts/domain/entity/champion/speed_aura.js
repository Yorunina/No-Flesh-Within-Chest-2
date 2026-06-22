// priority: 500

/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingEvent$LivingTickEvent} event 
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionSpeedAuraEntityTick(customData, event, championKey, championLevel) {
    const entity = event.entity
    ApplyAuraEffect(entity, 16,
        (mob) => !mob.isPlayer() && mob.isMonster() && mob.isAlive(),
        (mob) => mob.potionEffects.add('minecraft:speed', 40, championLevel, false, false),
        null,
        'auraMobsSpeed'
    )
}

RegistryChampionStrategy(
    new ChampionStrategyModel('speed_aura')
        .addStrategy('entity_tick', ChampionSpeedAuraEntityTick)
)