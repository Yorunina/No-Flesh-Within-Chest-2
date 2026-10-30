// priority: 500
RegistryOrgan('kubejs:pumpkin_shooter')
    .addScore('chestcavity:nerves', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PumpkinShooterEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    const chestCavity = entity.chestCavityInstance
    const query = chestCavity.getOrganQueryIndex()
    if (query.getItemSlotCount('kubejs:llama_gland', false, null) > 0) {
        SpitTowardFacing(entity, level)
    } else if (query.getItemSlotCount('kubejs:ghast_sac', false, null) > 0) {
        SummonFireballTowardFacing(entity, level)
    } else if (query.getItemSlotCount('kubejs:weevil_mouth', false, null) > 0) {
        SummonMudTowardFacing(entity, level)
    } else {
        SummonSnowballTowardFacing(entity, level)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pumpkin_shooter')
        .addOnlyStrategy('entity_tick', PumpkinShooterEntityTick)
)
