// priority: 500
const FinalDoDamageHealthDownUUID = UUID.fromString('30C3B843-D9FB-436A-B0F6-6FD11D0A4755')
// todo 需要进行额外的回归测试
BlockEvents.rightClicked(event => {
    if (!AStages.serverHasStage('ftb_final_iteration_90', event.server)) return
    let value = -1
    const attributeInstance = player.getAttribute('minecraft:generic.max_health')
    let oldModifier = attributeInstance.getModifier(FinalDoDamageHealthDownUUID)
    if (oldModifier) value = oldModifier.amount + value
    attributeInstance.removeModifier(FinalDoDamageHealthDownUUID)
    let attributeModifier = new $AttributeModifier(FinalDoDamageHealthDownUUID, 'FinalDoDamageHealthDown', value, $Operation.ADDITION)
    attributeInstance.addPermanentModifier(attributeModifier)
})