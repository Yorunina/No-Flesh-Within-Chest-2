// priority: 999
const OrganEntityDoDamageEvent = new OrganEventModel('entity_do_damage')
const TetraEntityDoDamageEvent = new TetraEffectEventModel('entity_do_damage')

/**
 * 
 * @param {Internal.LivingHurtEvent} event 
 */
function EntityDoDamage(event, customData) {
    OrganEntityDoDamageEvent.run(event.source.actual, customData, [event])
    if (event.isCanceled()) return
    // 这里传入攻击者，受击者防御效果在 entity_be_hurt 结算。
    TetraEntityDoDamageEvent.run(event.source.actual, customData, [event])
}
