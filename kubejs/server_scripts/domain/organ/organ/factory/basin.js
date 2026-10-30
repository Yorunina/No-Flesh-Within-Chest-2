// priority: 500
RegistryOrgan('kubejs:basin')
/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function basinChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let aboveSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, -1]])
    if (aboveSlots.length == 0) return

    let aboveSlotDef = aboveSlots[0]
    let aboveSlotIndex = aboveSlotDef.getId()
    let aboveItem = ccInv.getStackInSlot(aboveSlotIndex)

    if (aboveItem.isEmpty()) return

    let itemCopy = aboveItem.copy()
    let insertedCount = AddItemIntoBundle(organItem, itemCopy, 64, pStack => pStack.getMaxStackSize() / 64)
    if (insertedCount <= 0) return
    aboveItem.shrink(insertedCount)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:basin')
        .addStrategy('chest_cavity_update', basinChestCavityUpdate)
)
