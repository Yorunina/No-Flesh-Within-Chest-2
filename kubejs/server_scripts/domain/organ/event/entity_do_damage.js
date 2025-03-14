// priority: 500
publicField.NFWC.events.OrganEntityDoDamageEvent = new OrganEventModel('entity_do_damage')
const OrganEntityDoDamageEvent = publicField.NFWC.events.OrganEntityDoDamageEvent

/**
 * 
 * @param {Internal.LivingHurtEvent} event 
 */
function OrganEntityDoDamage(event, customData) {
    OrganEntityDoDamageEvent.run(event.source.actual, customData, [event])
}