// priority: 500
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingEvent$LivingTickEvent} event
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionStunAuraEntityTick(customData, event, championKey, championLevel) {
    const entity = event.entity
    const level = entity.level
    const interval = 400 / championLevel
    if (entity.age % interval != 0) return

    const entityPos = entity.position()
    const players = GetLivingWithinRadiusVec3d(level, entityPos, 16, (pLevel, pMob) => pMob.isPlayer())
    players.forEach(player => {
        player.potionEffects.add('cataclysm:stun', 60, 0, false, false)
    })
}

RegistryChampionStrategy(
    new ChampionStrategyModel('stun_aura')
        .addStrategy('entity_tick', ChampionStunAuraEntityTick)
)
