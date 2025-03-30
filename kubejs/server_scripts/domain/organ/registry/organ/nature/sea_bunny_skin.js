// priority: 500
RegistryOrgan('kubejs:sea_bunny_skin')
    .addScore('chestcavity:defense', 1.5)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SeaBunnyGlandEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    let entityList = GetLivingWithinRadius(level, entity.position(), 8, (pLevel, pEntity) => {
        if (pEntity instanceof $PathfinderMob) {
            if (pEntity.target && pEntity.target.equals(entity)) return false
            return true
        }
        return false
    })
    if (entityList.length <= 0) return
    entityList.forEach(pEntity => {
        pEntity.setTarget(entity)  
    })
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sea_bunny_skin')
        .addOnlyStrategy('entity_tick', SeaBunnyGlandEntityTick)
)
