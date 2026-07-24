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