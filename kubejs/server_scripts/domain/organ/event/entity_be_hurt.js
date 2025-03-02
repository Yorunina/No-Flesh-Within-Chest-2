// priority: 500
const OrganEntityBeHurtEvent = new OrganEventModel('entity_be_hurt')

/**
 * 
 * @param {Internal.LivingHurtEvent} event 
 */
function OrganEntityBeHurt(event, customData) {
    OrganEntityBeHurtEvent.run(event.source.actual, customData, [event])
}