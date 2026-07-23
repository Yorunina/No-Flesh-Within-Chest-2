// priority: 999
const OrganEntityBeHurtEvent = new OrganEventModel('entity_be_hurt')
const ChampionEntityBeHurtEvent = new ChampionEventModel('entity_be_hurt')

/**
 * 
 * @param {Internal.LivingDamageEvent} event 
 * @param {*} customData 
 */
function OrganEntityBeHurt(event, customData) {
    const entity = event.entity
    OrganEntityBeHurtEvent.run(entity, customData, [event])
    ChampionEntityBeHurtEvent.run(entity, customData, [event])
    MarkingEffectBeHurt(event, customData)
}

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