// priority: 500
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingEvent$LivingTickEvent} event 
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionHealAuraEntityTick(customData, event, championKey, championLevel) {
    const entity = event.entity

    if (entity.age % 200 == 0) {
        let nearByMobs = GetLivingWithinRadiusVec3d(entity.level, entity.position(), 16,
            (pLevel, pMob) => !pMob.isPlayer() && pMob.isMonster() && pMob.isAlive()
        )
        nearByMobs.forEach(pMob => {
            pMob.heal(championLevel * pMob.maxHealth * 0.05)
            entity.level.spawnParticles($ParticleTypes.HEART, true, pMob.x, pMob.y + 1, pMob.z, 0.3, 0.3, 0.3, 5, 0.1)
        })
    }
}

RegistryChampionStrategy(
    new ChampionStrategyModel('heal_aura')
        .addStrategy('entity_tick', ChampionHealAuraEntityTick)
)