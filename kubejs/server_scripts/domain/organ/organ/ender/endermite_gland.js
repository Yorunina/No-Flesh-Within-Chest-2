// priority: 500
RegistryOrgan('kubejs:endermite_gland')
    .addScore('chestcavity:endurance', 1)
    .addScore('chestcavity:filtration', 1)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EndermiteGlandEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    /**@type {Internal.PathfinderMob} */
    let entities = GetLivingWithinRadiusVec3d(level, entity.position(), 16, (pLevel, pEntity) => {
        if (!(pEntity instanceof $PathfinderMob)) return false
        if (!pEntity.isMonster()) return false
        if (pEntity.getTarget() && pEntity.getTarget().equals(entity)) return false
        return true
    })
    entities.forEach((pEntity) => {
        pEntity.setTarget(entity)
    })
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:endermite_gland')
    .addOnlyStrategy('entity_tick', EndermiteGlandEntityTick)
)