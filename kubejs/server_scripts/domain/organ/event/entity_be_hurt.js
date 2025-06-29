// priority: 999
const OrganEntityBeHurtEvent = new OrganEventModel('entity_be_hurt')

/**
 * 
 * @param {Internal.LivingDamageEvent} event 
 */
function OrganEntityBeHurt(event, customData) {
    const entity = event.source.actual
    OrganEntityBeHurtEvent.run(entity, customData, [event])
}