// priority: 999

const TetraEntityDamageFirstEvent = new TetraEffectEventModel('entity_damage_first')

/**
 * 造成伤害前节点，位于器官伤害结算之前。
 * @param {Internal.LivingHurtEvent} event
 * @param {Object} customData
 */
function EntityDamageFirst(event, customData) {
    TetraEntityDamageFirstEvent.run(event.source.actual, customData, [event])
}
