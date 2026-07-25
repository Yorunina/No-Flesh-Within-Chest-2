// priority: 500
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingEvent$LivingTickEvent} event
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionPullEntityTick(customData, event, championKey, championLevel) {
    const entity = event.entity
    const level = entity.level
    const interval = 400 / championLevel
    if (entity.age % interval != 0) return

    const entityPos = entity.position()
    const strength = 1.5
    const players = GetLivingWithinRadiusVec3d(level, entityPos, 16, (pLevel, pMob) => pMob.isPlayer())
    players.forEach(player => {
        let dir = Vec3dNormalize(entityPos.subtract(player.position()))
        player.setDeltaMovement(dir.x() * strength, dir.y() * strength, dir.z() * strength)
    })
}

RegistryChampionStrategy(
    new ChampionStrategyModel('pull')
        .addStrategy('entity_tick', ChampionPullEntityTick)
)
