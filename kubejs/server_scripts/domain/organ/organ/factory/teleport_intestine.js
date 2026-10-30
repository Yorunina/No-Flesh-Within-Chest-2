// priority: 500

RegistryOrgan('kubejs:teleport_intestine')
    .addScore('chestcavity:nutrition', 1)

/**
 * 处理器官事件：item_right_clicked。
 * @param {OrganEventCustomData} customData
 * @param {Internal.ItemClickedEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function teleportIntestineItemRightClicked(customData, event, organItem, organIndex, slotType) {
    const item = event.item
    if (item.isEmpty() || item.getMod() == 'chestcavity' || item.is('kubejs:blood_extractor')) return
    const entity = event.entity
    if (OrganItemCoolDown(entity, organItem)) return
    const chestCavity = entity.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let contents = GetBundleContents(organItem)
    let filterItem = contents[0]
    if (filterItem != null) {
        if (filterItem.getId() != item.getId()) return
    }
    let targetSlot = GetItemDirectionSlots(invTypeData, organItem, organIndex)
    if (targetSlot.length == 0) return
    let targetSlotDef = targetSlot[0]
    let targetSlotIndex = targetSlotDef.getId()
    let targetItem = ccInv.getStackInSlot(targetSlotIndex)
    if (targetItem.isEmpty()) {
        let newItem = item.copy()
        item.shrink(item.getCount())
        let targetIndex = targetSlot[0].getId()
        let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
        SetChestCavityOrgan(customData, chestCavity, newItem, targetIndex, targetSlotType, true)
        entity.addItemCooldown(organItem, 20 * 5)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:teleport_intestine')
        .addOnlyStrategy('item_right_clicked', teleportIntestineItemRightClicked)
)

ItemEvents.rightClicked('kubejs:teleport_intestine', CycleItemDirection)
