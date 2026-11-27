// priority: 999

const OrganEntityHurtFinalEvent = new OrganEventModel('entity_final_damage')
const TetraEntityHurtFinalEvent = new TetraEffectEventModel('entity_final_damage')

/**
 * @param {Internal.LivingDamageEvent} event
 * @param {Object} customData
 */
function EntityHurtFinal(event, customData) {
    OrganEntityHurtFinalEvent.run(event.source.actual, customData, [event])
    if (event.amount <= 0 || event.source.is($DamageTypes.THORNS)) return
    TetraEntityHurtFinalEvent.run(event.source.actual, customData, [event])
}
