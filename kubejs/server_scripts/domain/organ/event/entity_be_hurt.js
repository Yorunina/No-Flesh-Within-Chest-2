// priority: 999
const OrganEntityBeHurtEvent = new OrganEventModel('entity_be_hurt')

/**
 * 
 * @param {Internal.LivingDamageEvent} event 
 * @param {*} customData 
 */
function OrganEntityBeHurt(event, customData) {
    const entity = event.entity
    OrganEntityBeHurtEvent.run(entity, customData, [event])
}