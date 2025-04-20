// priority: 500
RegistryOrgan('kubejs:sweets_gland')
    .addScore('chestcavity:endurance', 0.5)
    .addScore('chestcavity:digestion', 1)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function SweetsGlandChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    if (slotType == DigestSlot) {
        SetCustomData(customData, 'hasSweetsGland', 2)
    } else {
        SetCustomData(customData, 'hasSweetsGland', 1)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sweets_gland')
        .addOnlyStrategy('chest_cavity_update', SweetsGlandChestCavityUpdate, 10)
)