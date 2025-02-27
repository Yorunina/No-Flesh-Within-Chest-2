// priority: 500
SlotChestCavityUpdateStrategy.addStrategy('high_adaptability', HighAdaptabilitySlot)

/**
 * @param {any} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function HighAdaptabilitySlot(customData, event, organItem, organIndex) {
    const { chestCavity } = event
    let organData = $ChestCavityUtil.lookupOrgan(organItem, null)
    organData.organScores.forEach((score, value) => {
        let oriValue = chestCavity.getOrganScore(score)
        chestCavity.setOrganScore(score, oriValue + value * 0.5)
    })
}