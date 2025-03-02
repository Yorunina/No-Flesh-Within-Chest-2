// priority: 500
const OrganEntityDoDamageEvent = new OrganEventModel('entity_do_damage')

/**
 * 
 * @param {Internal.LivingHurtEvent} event 
 */
function OrganEntityDoDamage(event, customData) {
    OrganEntityDoDamageEvent.run(event.source.actual, customData, [event])
    if (event.source.actual) {
        event.entity.potionEffects.add('kubejs:lethal_toxins', 1200, 0, false, false)
        event.entity.chestCavityInstance.customEntityDataMap.put('lethalToxins', event.amount)
    }
}