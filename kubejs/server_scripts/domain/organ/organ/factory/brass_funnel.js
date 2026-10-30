// priority: 500

RegistryOrgan('kubejs:brass_funnel')

/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function brassFunnelChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const player = event.entity

    const chestCavity = player.chestCavityInstance

    const inventory = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let belowSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, 1]])
    if (belowSlots.length == 0) return

    let belowSlotDef = belowSlots[0]
    let belowSlotIndex = belowSlotDef.getId()
    let belowItem = inventory.getStackInSlot(belowSlotIndex)

    // 如果下方没有物品，不执行
    if (belowItem.isEmpty()) return
    if (belowItem.getItem() instanceof $BundleItem) return
    let contents = GetBundleContents(organItem)
    let filterItem = contents[0]
    if (filterItem != null) {
        if (filterItem.getId() != belowItem.getId()) return
    }
    let rightSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[1, 0]])
    if (rightSlots.length == 0) return
    let rightSlotDef = rightSlots[0]
    let rightSlotIndex = rightSlotDef.getId()
    let rightItem = inventory.getStackInSlot(rightSlotIndex)
    if (rightItem.isEmpty() || rightItem.getCount() != 1) return
    // 仅通用储物器官可接收物流；过滤器、催化物槽和普通物品不能成为伪容器。
    let capacity
    switch (String(rightItem.getId())) {
        case 'kubejs:basin': capacity = 128; break
        case 'kubejs:deployer':
        case 'kubejs:crushing_wheel': capacity = 64; break
        default: return
    }
    let available = capacity - GetBundleCountentWeight(rightItem, pStack => 1)
    if (available <= 0) return
    let itemCopy = belowItem.copy()
    itemCopy.setCount(Math.min(itemCopy.getCount(), available))
    let insertedCount = AddItemIntoBundle(rightItem, itemCopy, 64, pStack => pStack.getMaxStackSize() / 64)
    if (insertedCount <= 0) return
    belowItem.shrink(insertedCount)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:brass_funnel')
        .addStrategy('chest_cavity_update', brassFunnelChestCavityUpdate)
)
