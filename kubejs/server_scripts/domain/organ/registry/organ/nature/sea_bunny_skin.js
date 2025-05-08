// priority: 500
RegistryOrgan('kubejs:sea_bunny_skin')
    .addScore('kubejs:extreme_fitness', 1)
    .addScore('chestcavity:swim_speed', 1.5)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SeaBunnyGlandEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.age % 100 !== 0) return
    const level = event.level
    let entityList = GetLivingWithinRadius(level, entity.position(), 4, (pLevel, pEntity) => {
        if (pEntity instanceof $PathfinderMob) {
            if (pEntity.target && pEntity.target.equals(entity)) return false
            return true
        }
        return false
    })
    if (entityList.length <= 0) return
    RandomGet(entityList).setTarget(entity)
    // todo 可以增添粒子效果
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sea_bunny_skin')
        .addOnlyStrategy('entity_tick', SeaBunnyGlandEntityTick)
)
