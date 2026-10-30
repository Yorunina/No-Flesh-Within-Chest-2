// priority: 500
RegistryOrgan('kubejs:honeyed_stress')
    .addScore('kubejs:stress', 1)
    .addScore('chestcavity:defense', 1)

/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function honeyedStressChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const entity = event.entity

    const invTypeData = chestCavity.getInventoryTypeData()
    let aroundRelativeSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [
        [0, -1],
        [0, -2],
        [0, -3],
        [0, -4]
    ])
    let value = 0
    for (let slotDefinition of aroundRelativeSlots) {
        let pItem = ccInv.getStackInSlot(slotDefinition.getId())
        let count = ccInv.getStackInSlot(slotDefinition.getId()).getCount()
        if (pItem.isEmpty() || !pItem.isEdible()) continue
        let foodProperties = pItem.getFoodProperties(entity)
        let nutrition = foodProperties.getNutrition()
        value += (nutrition / 256) * count
    }
    if (value != 0) {
        chestCavity.setOrganScore('kubejs:stress', chestCavity.getOrganScore('kubejs:stress') + value)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:honeyed_stress')
        .addOnlyStrategy('chest_cavity_update', honeyedStressChestCavityUpdate, 1)
)
