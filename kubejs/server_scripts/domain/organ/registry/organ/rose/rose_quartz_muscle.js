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
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function RoseQuartzMuscleMpmTakeOn(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    let player = event.entity
    let partId = player.profile.isLegacy() ? 'kubejs:parts/arms/rose_arm_wide_model.json' : 'kubejs:parts/arms/rose_arm_slim_model.json'

    let index = customData.modelData.mpmParts.findIndex(mpmData => mpmData.partId.toString() == partId)
    if (index == -1) {
        customData.modelData.mpmParts.add(new MpmDataModel(partId).exportModelData())
    }
}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function RoseQuartzMuscleMpmTakeOff(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    let player = event.entity
    let partId = player.profile.isLegacy() ? 'kubejs:parts/arms/rose_arm_wide_model.json' : 'kubejs:parts/arms/rose_arm_slim_model.json'
    customData.modelData.mpmParts.removeIf(mpmData => mpmData.partId.toString() == partId)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_muscle')
        .addStrategy('chest_cavity_update', RoseQuartzMuscleChestCavityUpdate)
        .addOnlyStrategy('mpm_render_take_on', RoseQuartzMuscleMpmTakeOn)
        .addOnlyStrategy('mpm_render_take_off', RoseQuartzMuscleMpmTakeOff)
)