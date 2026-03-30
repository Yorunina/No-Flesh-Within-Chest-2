// priority: 500
const FinalDoDamageAttackDownUUID = UUID.fromString('A44F02C1-0E7B-490B-AD95-7DAEF3FF3F28')
// todo 需要进行额外的回归测试
/**
 * 
 * @param {Internal.LivingHurtEvent} event 
 * @param {*} customData 
 */
function FinalEntityDoDamage(event, customData) {
    if (!event.source.player) return
    const player = event.source.player
    if (!AStages.serverHasStage('ftb_final_iteration_50', player.server)) return
    let value = -1
    const attributeInstance = player.getAttribute('minecraft:generic.attack_damage')
    let oldModifier = attributeInstance.getModifier(FinalDoDamageAttackDownUUID)
    if (oldModifier) value = oldModifier.amount + value
    attributeInstance.removeModifier(FinalDoDamageAttackDownUUID)
    let attributeModifier = new $AttributeModifier(FinalDoDamageAttackDownUUID, 'FinalDoDamageAttackDown', value, $Operation.ADDITION)
    attributeInstance.addPermanentModifier(attributeModifier)
}