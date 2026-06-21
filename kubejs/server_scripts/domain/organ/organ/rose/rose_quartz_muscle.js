// priority: 500
RegistryOrgan('kubejs:rose_quartz_muscle')
    .addScore('chestcavity:strength', 1.5)
    .addScore('chestcavity:defense', -0.5)
    .addScore('kubejs:rosy', 1.0)


/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RoseQuartzMuscleChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy')
    switch (slotType) {
        case 'rosy_explosion': {
            rosyValue = rosyValue + chestCavity.getOrganScore('chestcavity:strength') * chestCavity.inventory.countNonEmpty()
            break
        }
    }
    customData.attackDamage.addAttributeModifier(rosyValue, 'addition', 'base')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoseQuartzMuscleTakeOn(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    OrganSkinAdd(entity, 'chest', 'secret/chestcavity/rose_arm')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoseQuartzMuscleTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    OrganSkinRemove(entity, 'chest', 'secret/chestcavity/rose_arm')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_muscle')
        .addStrategy('chest_cavity_update', RoseQuartzMuscleChestCavityUpdate)
        .addOnlyStrategy('organ_take_on', RoseQuartzMuscleTakeOn)
        .addOnlyStrategy('organ_take_off', RoseQuartzMuscleTakeOff)
)