// priority: 800
/**
 * 
 * @param {Internal.LivingDamageEvent} event 
 * @param {*} customData 
 */
function MarkingEffectBeHurt(event, customData) {
    const entity = event.entity
    if (!entity.hasEffect('kubejs:marking')) return
    const pos = entity.position()
    const level = entity.level
    const source = event.source
    const players = level.getNearbyPlayers($TargetingConditions.forNonCombat(), entity, AABB.of(pos.x() + 16, pos.y() + 8, pos.z() + 16, pos.x() - 16, pos.y() - 8, pos.z() - 16))
    players.forEach(pPlayer => {
        MAAUtils.spawnDamageNumber(pPlayer, entity, source, event.amount, null)
    })
}