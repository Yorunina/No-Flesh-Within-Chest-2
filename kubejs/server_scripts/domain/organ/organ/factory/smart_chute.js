// priority: 500

RegistryOrgan('kubejs:smart_chute')
/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function smartChuteChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    const inventory = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let aboveSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, -1]])
    if (aboveSlots.length == 0) return
    let aboveSlotIndex = aboveSlots[0].getId()
    let aboveItem = inventory.getStackInSlot(aboveSlotIndex)
    if (aboveItem.isEmpty()) return
    let contents = GetBundleContents(organItem)
    let filterItem = contents[0]
    let canDrop = false
    if (filterItem == null) {
        canDrop = true
    } else {
        if (filterItem.getId() != aboveItem.getId()) return
        canDrop = true
    }
    if (!canDrop) return
    let itemCount = aboveItem.getCount()
    let itemCopy = aboveItem.copy()
    aboveItem.shrink(itemCount)
    let dropItem = itemCopy.copy()
    dropItem.setCount(itemCount)
    SpawnLootAtLocation(level, player.blockPosition(), [dropItem])
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:smart_chute')
        .addStrategy('chest_cavity_update', smartChuteChestCavityUpdate)
)
