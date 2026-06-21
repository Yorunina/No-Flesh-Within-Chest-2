// priority: 500
RegistryOrgan('kubejs:revolution_cable')
    .addScore('chestcavity:endurance', 1.5)
    .addScore('chestcavity:nerves', 0.5)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionCableChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let machineCount = chestCavity.inventory.count('#kubejs:machine')
    let revolutionCount = chestCavity.inventory.count('#kubejs:revolution')
    let total = revolutionCount + machineCount
    switch (slotType) {
        case MachinaryLubricant:
            customData.maxHealth.addAttributeModifier(total * 4, 'addition', 'base')
            break
        default:
            customData.maxHealth.addAttributeModifier(total, 'addition', 'base')
            break
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_cable')
        .addOnlyStrategy('chest_cavity_update', RevolutionCableChestCavityUpdate)
)