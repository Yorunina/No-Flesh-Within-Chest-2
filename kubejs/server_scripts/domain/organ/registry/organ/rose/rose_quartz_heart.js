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
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy') / 2
    switch (slotType) {
        case 'rosy_explosion': {
            rosyValue = rosyValue + chestCavity.getOrganScore('chestcavity:health') * chestCavity.inventory.countNonEmpty()
            break
        }
    }
    customData.maxHealth.addAttributeModifier(rosyValue, 'addition', 'base')
}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function RoseQuartzHeartMpmRender(customData, event, organItem, organIndex, slotType) {
    let mpmData = new MpmDataModel('kubejs:parts/body/rose_body_model.json').exportModelData()
    customData.mpmParts.push(mpmData)
}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function RoseQuartzHeartMpmTakeOn(customData, event, organItem, organIndex, slotType) {
    let partId = 'kubejs:parts/body/rose_body_model.json'
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
function RoseQuartzHeartMpmTakeOff(customData, event, organItem, organIndex, slotType) {
    let partId = 'kubejs:parts/body/rose_body_model.json'
    customData.modelData.mpmParts.removeIf(mpmData => mpmData.partId.toString() == partId)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_heart')
        .addStrategy('chest_cavity_update', RoseQuartzHeartChestCavityUpdate)
        .addOnlyStrategy('mpm_render_take_on', RoseQuartzHeartMpmTakeOn)
        .addOnlyStrategy('mpm_render_take_off', RoseQuartzHeartMpmTakeOff)
)