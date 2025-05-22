// priority: 500
RegistryOrgan('kubejs:sea_bunny_skin')
    .addScore('kubejs:extreme_fitness', 2)
    .addScore('chestcavity:swim_speed', 1.5)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SeaBunnyGlandEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    if (event.amount <= 0) return
    const entity = event.entity
    targetEntity.setTarget(entity)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sea_bunny_skin')
        .addOnlyStrategy('entity_be_hurt', SeaBunnyGlandEntityBeHurt)
)
