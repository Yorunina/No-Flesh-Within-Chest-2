// priority: 500
// const ImmunosuppressionSlot = 'immunosuppression_slot'
// SlotChestCavityUpdateStrategy.addStrategy(ImmunosuppressionSlot, ImmunosuppressionSlotEvent)

// /**
//  * @param {OrganEventCustomData} customData
//  * @param {Internal.EvaluateChestCavityJS} event 
//  * @param {Internal.ItemStack} organItem
//  * @param {number} organIndex
//  */
// function ImmunosuppressionSlotEvent(customData, event, organItem, organIndex, slotType) {
//     const { chestCavity } = event
//     let oriValue = chestCavity.getOrganScore('kubejs:immunosuppression')
//     chestCavity.setOrganScore('kubejs:immunosuppression', oriValue + 1)
// }