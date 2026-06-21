// priority: 500
const HighAdaptabilitySlot = 'high_adaptability'
SlotChestCavityUpdateStrategy.addStrategy(HighAdaptabilitySlot, HighAdaptabilitySlotEvent)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function HighAdaptabilitySlotEvent(customData, event, organItem, organIndex, slotType) {
    const { chestCavity } = event
    let organData = ChestCavityUtils.lookupOrgan(organItem, null)
    organData.organScores.forEach((score, value) => {
        let oriValue = chestCavity.getOrganScore(score)
        chestCavity.setOrganScore(score, oriValue + value * 0.5)
    })
}