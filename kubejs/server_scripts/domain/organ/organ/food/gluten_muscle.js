// priority: 500
RegistryOrgan('kubejs:gluten_muscle')
    .addScore('chestcavity:defense', 1.5)
    .addScore('chestcavity:digestion', 1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function GlutenMuscleChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const entity = event.entity
    
    const invTypeData = chestCavity.getInventoryTypeData()
    let aroundRelativeSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, FourDiagonalDirectionOffset)
    let value = 0
    for (let slotDefinition of aroundRelativeSlots) {
        let pItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (pItem.isEmpty() || !pItem.isEdible()) continue
        let foodProperties = pItem.getFoodProperties(entity)
        let foodHunger = foodProperties.getNutrition()
        let foodSaturation = foodHunger * foodProperties.getSaturationModifier() * 2
        value += foodSaturation
    }
    if (value != 0) {
        customData.attackDamage.addAttributeModifier(value / 2, 'addition', 'base')
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:gluten_muscle')
        .addStrategy('chest_cavity_update', GlutenMuscleChestCavityUpdate)
)
