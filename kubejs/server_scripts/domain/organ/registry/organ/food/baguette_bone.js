// priority: 500
RegistryOrgan('kubejs:baguette_bone')
    .addScore('chestcavity:defense', 1.5)
    .addScore('chestcavity:digestion', 1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BaguetteBoneChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    
    const invTypeData = chestCavity.getInventoryTypeData()
    let aroundRelativeSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, EightDirectionOffset)
    let value = 0
    for (let slotDefinition of aroundRelativeSlots) {
        let pItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (pItem.isEmpty() || !pItem.isEdible()) continue
        let foodProperties = pItem.getFoodProperties(player)
        let foodHunger = foodProperties.getNutrition()
        let foodSaturation = foodHunger * foodProperties.getSaturationModifier()
        value += foodSaturation
    }
    customData.armor.addAttributeModifier(value / 8, 'addition', 'base')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:baguette_bone')
        .addStrategy('chest_cavity_update', BaguetteBoneChestCavityUpdate)
)
