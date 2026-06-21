// priority: 500
RegistryOrgan('kubejs:living_beef_wellington')
    .addScore('chestcavity:strength', 1)
    .addScore('kubejs:extreme_strength', -1)
    .addScore('chestcavity:defense', -1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LivingBeefWellingtonChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const entity = event.entity

    const invTypeData = chestCavity.getInventoryTypeData()
    let aroundRelativeSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, -1], [0, -2], [0, -3], [0, -4]])
    let value = 0
    for (let slotDefinition of aroundRelativeSlots) {
        let pItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (pItem.isEmpty() || !pItem.isEdible()) continue
        let foodProperties = pItem.getFoodProperties(entity)
        if (foodProperties.getSaturationModifier() * 2 >= 1) continue
        value += 1
    }
    if (value != 0) {
        chestCavity.setOrganScore('kubejs:extreme_strength', chestCavity.getOrganScore('kubejs:extreme_strength') + value)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:living_beef_wellington')
        .addStrategy('chest_cavity_update', LivingBeefWellingtonChestCavityUpdate)
)
