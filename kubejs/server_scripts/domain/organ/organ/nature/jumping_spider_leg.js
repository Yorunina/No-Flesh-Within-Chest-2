// priority: 500
RegistryOrgan('kubejs:jumping_spider_leg')
    .addScore('chestcavity:knockback_resistant', -0.5)
    .setCanSpawn(true)
/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.OpenedEntityTickJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function JumpingSpiderLegEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type == 'crittersandcompanions:jumping_spider') return
    if (!entity.onGround()) return
    entity.setDeltaMovement(entity.getDeltaMovement().add(0, 0.42, 0))
    entity.setJumping(true)
    if (entity.isPlayer()) {
        entity.hasImpulse = true
        entity.connection.send(new $ClientboundSetEntityMotionPacket(entity))
    }
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:jumping_spider_leg')
        .addOnlyStrategy('entity_tick', JumpingSpiderLegEntityTick)
)
