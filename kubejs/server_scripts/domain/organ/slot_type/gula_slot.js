// priority: 500
const GulaSlot = 'gula_slot'

SlotChestCavityUpdateStrategy.addOnlyStrategy(GulaSlot, GulaSlotEventDefer, -10)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function GulaSlotEventDefer(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    chestCavity.setOrganScore('chestcavity:ease_of_access', 1)
    chestCavity.setOrganScore('chestcavity:nerves', 2)
    chestCavity.setOrganScore('chestcavity:endurance', 2)
    chestCavity.setOrganScore('chestcavity:breath_capacity', 2)
    chestCavity.setOrganScore('chestcavity:breath_recovery', 2)
    chestCavity.setOrganScore('chestcavity:detoxification', 2)
    chestCavity.setOrganScore('chestcavity:filtration', 2)
}