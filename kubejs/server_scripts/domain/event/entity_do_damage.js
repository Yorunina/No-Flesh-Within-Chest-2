// priority: 999
const OrganEntityDoDamageEvent = new OrganEventModel('entity_do_damage')

/**
 * 
 * @param {Internal.LivingHurtEvent} event 
 */
function OrganEntityDoDamage(event, customData) {
    const entity = event.source.actual
    OrganEntityDoDamageEvent.run(entity, customData, [event])
}