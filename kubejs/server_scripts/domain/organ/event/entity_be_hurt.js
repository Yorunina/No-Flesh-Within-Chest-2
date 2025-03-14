// priority: 500
publicField.NFWC.events.OrganEntityBeHurtEvent = new OrganEventModel('entity_be_hurt')
const OrganEntityBeHurtEvent = publicField.NFWC.events.OrganEntityBeHurtEvent

/**
 * 
 * @param {Internal.LivingDamageEvent} event 
 */
function OrganEntityBeHurt(event, customData) {
    OrganEntityBeHurtEvent.run(event.source.actual, customData, [event])
}