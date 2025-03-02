// priority: 500
const OrganEntityDoDamageEvent = new OrganEventModel('entity_do_damage')

/**
 * 
 * @param {Internal.LivingHurtEvent} event 
 */
function OrganEntityDoDamage(event, customData) {
    OrganEntityDoDamageEvent.run(event.source.actual, customData, [event])
}