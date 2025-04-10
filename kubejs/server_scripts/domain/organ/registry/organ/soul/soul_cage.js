// priority: 500
RegistryOrgan('kubejs:soul_cage')
    .addScore('chestcavity:endurance', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SoulCageEntityKill(customData, event, organItem, organIndex, slotType) {
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:soul_cage')
        .addOnlyStrategy('entity_kill', SoulCageEntityKill)
)