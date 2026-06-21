// priority: 500
RegistryOrgan('kubejs:rose_quartz_liver')
    .addScore('chestcavity:detoxification', 1.0)
    .addScore('chestcavity:defense', -0.5)
    .addScore('kubejs:rosy', 0.5)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoseQuartzLiverChestCavityUpdateOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy')
    switch (slotType) {
        case 'rosy_explosion': {
            rosyValue = rosyValue * 1.5 + chestCavity.getOrganScore('chestcavity:detoxification') * chestCavity.inventory.countNonEmpty() * 0.5
            break
        }
    }
    chestCavity.setOrganScore('kubejs:rosy', rosyValue)
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_liver')
        .addOnlyStrategy('chest_cavity_update', RoseQuartzLiverChestCavityUpdateOnly)
)