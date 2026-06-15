// priority: 500
RegistryOrgan('kubejs:sweet_heart')
    .addScore('chestcavity:health', 1.5)
    .addScore('chestcavity:nutrition', 1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SweetHeartChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const entity = event.entity
    
    const invTypeData = chestCavity.getInventoryTypeData()
    let aroundRelativeSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, EightDirectionOffset)
    let value = 0
    for (let slotDefinition of aroundRelativeSlots) {
        let pItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (pItem.isEmpty() || !pItem.isEdible()) continue
        let foodProperties = pItem.getFoodProperties(entity)
        let foodHunger = foodProperties.getNutrition()
        value += foodHunger
    }
    if (value != 0) {
        chestCavity.setOrganScore('chestcavity:health', chestCavity.getOrganScore('chestcavity:nutrition') + value)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sweet_heart')
        .addStrategy('chest_cavity_update', SweetHeartChestCavityUpdate)
)
