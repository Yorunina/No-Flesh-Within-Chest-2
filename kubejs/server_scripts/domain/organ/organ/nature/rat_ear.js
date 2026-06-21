// priority: 500
RegistryOrgan('kubejs:rat_ear')
    .addScore('kubejs:attack_dodge', 1)
    .addScore('chestcavity:speed', 1)
    .setCanSpawn(true)
    
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RatEarEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    const blockPos = entity.blockPosition()
    /**@type {Internal.LivingEntity[]} */
    let nearEntities = GetLivingWithinRadius(level, blockPos, 16, (pLevel, pEntity) => {
        return !pEntity.isPlayer() && pEntity.isAlive()
    })
    nearEntities.forEach(pEntity => {
        pEntity.potionEffects.add('minecraft:glowing', 20 * 12, 0, false, false)
    })
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rat_ear')
        .addOnlyStrategy('entity_tick', RatEarEntityTick)
)

