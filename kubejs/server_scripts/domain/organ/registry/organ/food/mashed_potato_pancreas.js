// priority: 500
RegistryOrgan('kubejs:mashed_potato_pancreas')
    .addScore('chestcavity:digestion', 1.5)
    .addScore('kubejs:extreme_fitness', -1)
    .addScore('chestcavity:defense', -1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function MashedPotatoPancreasChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory

    const invTypeData = chestCavity.getInventoryTypeData()
    let aroundRelativeSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[-1, 0], [1, 0], [-2, 0], [2, 0]])
    let value = 0
    for (let slotDefinition of aroundRelativeSlots) {
        let pItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (pItem.isEmpty() || !pItem.hasTag('kubejs:food')) continue
        if (pItem.is('kubejs:mashed_potato_pancreas')) continue
        value += 1
    }
    if (value != 0) {
        chestCavity.setOrganScore('kubejs:extreme_fitness', chestCavity.getOrganScore('kubejs:extreme_fitness') + value)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:mashed_potato_pancreas')
        .addStrategy('chest_cavity_update', MashedPotatoPancreasChestCavityUpdate)
)
