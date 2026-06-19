// priority: 500
RegistryOrgan('kubejs:telescopic_arm')
    .addScore('chestcavity:nerves', 0.5)
    .addScore('chestcavity:knockback_resistant', 1)

RegistryOrgan('kubejs:telescopic_attack_arm')
    .addScore('chestcavity:strength', 1)
    .addScore('chestcavity:knockback_resistant', 1)


/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TelescopicArmChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    let blockReachUp = 1
    if (slotType == MachinaryLubricant) {
        blockReachUp = 4
    }
    customData.blockReach.addAttributeModifier(blockReachUp, 'addition', 'base')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:telescopic_arm')
        .addOnlyStrategy('chest_cavity_update', TelescopicArmChestCavityUpdate)
)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TelescopicAttackArmChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    let entityReach = 0.5
    if (slotType == MachinaryLubricant) {
        entityReach = 2
    }
    customData.entityReach.addAttributeModifier(entityReach, 'addition', 'base')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:telescopic_attack_arm')
        .addOnlyStrategy('chest_cavity_update', TelescopicAttackArmChestCavityUpdate)
)