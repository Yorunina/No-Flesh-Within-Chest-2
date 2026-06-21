// priority: 500
RegistryOrgan('kubejs:rose_quartz_heart')
    .addScore('chestcavity:health', 1)
    .addScore('chestcavity:defense', -0.5)
    .addScore('kubejs:rosy', 1.0)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RoseQuartzHeartChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy') * 0.5
    switch (slotType) {
        case 'rosy_explosion': {
            rosyValue = rosyValue + chestCavity.getOrganScore('chestcavity:health') * chestCavity.inventory.countNonEmpty() * 0.5
            break
        }
    }
    customData.maxHealth.addAttributeModifier(rosyValue, 'addition', 'base')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_heart')
        .addStrategy('chest_cavity_update', RoseQuartzHeartChestCavityUpdate)
)
