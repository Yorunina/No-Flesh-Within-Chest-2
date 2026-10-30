// priority: 500

RegistryOrgan('kubejs:magnetic_stomach')
    .addScore('chestcavity:digestion', 1)

/**
 * 处理器官事件：entity_be_interacted。
 * @param {OrganEventCustomData} customData
 * @param {Internal.ItemEntityInteractedEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function magneticStomachEntityBeInteracted(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.target
    if (!(entity instanceof $LivingEntity)) return
    const level = entity.level
    const pos = entity.blockPosition()
    const chestCavity = entity.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let contents = GetBundleContents(organItem)
    let filterItem = contents[0]
    let items = null
    if (filterItem == null) {
        items = GetItemEntityWithinRadius(level, pos, 3, (level, entity) => true)
        if (items.isEmpty()) return
    } else {
        items = GetItemEntityWithinRadius(level, pos, 3, (level, entity) => {
            if (entity.getItem().getId() == filterItem.getId()) return true
        })
        if (items.isEmpty()) return
    }
    if (items.length > 0) {
        let firstItemEntity = items[0]
        let itemStack = firstItemEntity.getItem()
        let targetSlot = GetItemDirectionSlots(invTypeData, organItem, organIndex)
        if (targetSlot.length == 0) return
        let targetSlotDef = targetSlot[0]
        let targetSlotIndex = targetSlotDef.getId()
        let targetItem = ccInv.getStackInSlot(targetSlotIndex)
        if (!CanMergeItemStacks(targetItem, itemStack, ccInv.getMaxStackSize())) return
        if (!targetItem.isEmpty()) {
            firstItemEntity.discard()
            let newItem = itemStack.copy()
            newItem.setCount(itemStack.getCount() + targetItem.getCount())
            let targetIndex = targetSlot[0].getId()
            let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
            SetChestCavityOrgan(customData, chestCavity, newItem, targetIndex, targetSlotType, true)
            entity.addItemCooldown(organItem, 20 * 5)
        } else if (targetItem.isEmpty()) {
            firstItemEntity.discard()
            let targetIndex = targetSlot[0].getId()
            let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
            SetChestCavityOrgan(customData, chestCavity, itemStack, targetIndex, targetSlotType, true)
        }
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:magnetic_stomach')
        .addStrategy('entity_be_interacted', magneticStomachEntityBeInteracted)
)

ItemEvents.rightClicked('kubejs:magnetic_stomach', CycleItemDirection)
