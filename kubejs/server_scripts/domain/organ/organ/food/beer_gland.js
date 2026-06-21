// priority: 500
RegistryOrgan('kubejs:beer_gland')
    .addScore('chestcavity:filtration', 1)
    .addScore('chestcavity:fire_resistant', -1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BeerGlandChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    if (slotType == DigestSlot) {
        SetCustomData(customData, 'hasBeerGland', 2)
    } else {
        SetCustomData(customData, 'hasBeerGland', 1)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:beer_gland')
        .addOnlyStrategy('chest_cavity_update', BeerGlandChestCavityUpdate, 10)
)