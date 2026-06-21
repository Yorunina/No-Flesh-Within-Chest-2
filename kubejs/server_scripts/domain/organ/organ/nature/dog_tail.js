// priority: 500
RegistryOrgan('kubejs:dog_tail')
    .addScore('kubejs:extreme_fitness', 1)
    .addScore('chestcavity:strength', -1)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DogTailEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    if (entity.age % 200 != 0) return
    let tamedLivingList = GetTamedEntityWithinRadius(level, entity, 16)

    if (tamedLivingList.length <= 0) return
    tamedLivingList.forEach(pTarget => {
        pTarget.potionEffects.add('minecraft:regeneration', 20 * 30, 0, false, false)
    })
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:dog_tail')
        .addOnlyStrategy('entity_tick', DogTailEntityTick)
)
