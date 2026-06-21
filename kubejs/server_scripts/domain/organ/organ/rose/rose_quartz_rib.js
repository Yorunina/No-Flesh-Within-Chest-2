// priority: 500
RegistryOrgan('kubejs:rose_quartz_rib')
    .addScore('chestcavity:defense', 1.0)
    .addScore('kubejs:rosy', 1.0)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RoseQuartzRibChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy')
    switch (slotType) {
        case 'rosy_explosion': {
            rosyValue = rosyValue + chestCavity.getOrganScore('chestcavity:defense') * chestCavity.inventory.countNonEmpty() * 0.5
            break
        }
    }
    customData.armor.addAttributeModifier(rosyValue * 0.5, 'addition', 'base')
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_rib')
        .addStrategy('chest_cavity_update', RoseQuartzRibChestCavityUpdate)
)
