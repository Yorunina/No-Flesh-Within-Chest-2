// priority: 500
RegistryOrgan('kubejs:jar_of_vacuum')
    .addScore('chestcavity:health', -0.5)

const JarOfVacuumTempAttackUpUUID = UUID.fromString('7B6425E2-D063-426D-9FBA-FD84EE2000F3')
/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function JarOfVacuumChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    
    const invTypeData = chestCavity.getInventoryTypeData()
    let aroundRelativeSlots = GetEightDirectionRelativeSlot(invTypeData, organIndex)
    let value = 0
    for (let slotDefinition of aroundRelativeSlots) {
        let curItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (curItem.isEmpty()) continue
        if (curItem.hasTag('kubejs:food')) {
            value += 1
        }
    }
    customData.attackDamage.addAttributeModifier(value, 'addition', 'base')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:jar_of_vacuum')
        .addStrategy('chest_cavity_update', JarOfVacuumChestCavityUpdate)
)
