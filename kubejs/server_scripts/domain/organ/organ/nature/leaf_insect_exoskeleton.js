// priority: 500
RegistryOrgan('kubejs:leaf_insect_exoskeleton')
    .addScore('chestcavity:defense', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LeafInsectExoskeletonChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const { chestCavity } = event
    let defenseScore = chestCavity.getOrganScore('chestcavity:defense')
    chestCavity.setOrganScore('chestcavity:strength', defenseScore)
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:leaf_insect_exoskeleton')
        .addOnlyStrategy('chest_cavity_update', LeafInsectExoskeletonChestCavityUpdate, 1)
)