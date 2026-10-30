// priority: 500

RegistryOrgan('kubejs:output_brass_funnel')

/**
 * 处理器官事件：entity_be_hurt。
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function outputBrassFunnelEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    const inventory = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let rightSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[-1, 0]])
    if (rightSlots.length == 0) return
    let rightSlotDef = rightSlots[0]
    let rightSlotIndex = rightSlotDef.getId()
    let rightItem = inventory.getStackInSlot(rightSlotIndex)
    if (rightItem.isEmpty()) return
    let rightContents = GetBundleContents(rightItem)
    let firstItem = rightContents[0]
    if (firstItem == null) return
    let contents = GetBundleContents(organItem)
    let filterItem = contents[0]
    if (filterItem != null) {
        if (filterItem.getId() != firstItem.getId()) return
        let fluidHandler = GetItemFluidHandler(filterItem)
        if (fluidHandler != null) {
            let firstFluidHandler = GetItemFluidHandler(firstItem)
            if (fluidHandler.getFluid().getFluid() != firstFluidHandler.getFluid().getFluid()) return
            if (fluidHandler.getFluid().getAmount() != firstFluidHandler.getFluid().getAmount()) return
        }
    }
    let belowSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, 1]])
    if (belowSlots.length == 0) return

    let belowSlotDef = belowSlots[0]
    let belowSlotIndex = belowSlotDef.getId()
    let belowItem = inventory.getStackInSlot(belowSlotIndex)

    // 扣除源条目前，检查完整 NBT、物品上限及胸腔槽位容量。
    if (!CanMergeItemStacks(belowItem, firstItem, inventory.getMaxStackSize())) return
    let transferCount = firstItem.getCount()
    let itemToTransfer = firstItem.copy()
    itemToTransfer.setCount(transferCount)

    // 2. 从收纳袋中移除该物品
    RemoveBundleItem(rightItem, 0, transferCount)

    // 3. 添加到下方槽位
    if (belowItem.isEmpty()) {
        // 下方为空：直接放置
        let targetSlotType = chestCavity.inventoryTypeData.getSlotType(belowSlotIndex)
        SetChestCavityOrgan(customData, chestCavity, itemToTransfer, belowSlotIndex, targetSlotType, true)
    } else {
        // 下方已有可兼容且容量足够的堆叠。
        let newCount = belowItem.getCount() + transferCount
        let mergedStack = belowItem.copy()
        mergedStack.setCount(newCount)
        let targetSlotType = chestCavity.inventoryTypeData.getSlotType(belowSlotIndex)
        SetChestCavityOrgan(customData, chestCavity, mergedStack, belowSlotIndex, targetSlotType, true)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:output_brass_funnel')
        .addOnlyStrategy('entity_be_hurt', outputBrassFunnelEntityBeHurt)
)
