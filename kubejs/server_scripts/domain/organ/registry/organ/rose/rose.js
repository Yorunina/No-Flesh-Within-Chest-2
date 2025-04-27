// priority: 500
RegistryOrgan('kubejs:rose_quartz_muscle')
    .addScore('chestcavity:strength', 1.5)
    .addScore('chestcavity:defense', -0.5)
    .addScore('kubejs:rosy', 1.0)

RegistryOrgan('kubejs:rose_quartz_heart')
    .addScore('chestcavity:health', 1)
    .addScore('chestcavity:defense', -0.5)
    .addScore('kubejs:rosy', 1.0)

RegistryOrgan('kubejs:rose_quartz_rib')
    .addScore('chestcavity:defense', 1.0)
    .addScore('kubejs:rosy', 1.0)

RegistryOrgan('kubejs:rose_quartz_dialyzer')
    .addScore('chestcavity:filtration', 2.0)
    .addScore('chestcavity:defense', -1)
    .addScore('kubejs:rosy', 0.5)

RegistryOrgan('kubejs:rose_quartz_liver')
    .addScore('chestcavity:detoxification', 1.0)
    .addScore('chestcavity:defense', -0.5)
    .addScore('kubejs:rosy', 0.5)

/** ============================================================== */

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

/** ============================================================== */




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

/** ============================================================== */

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
            rosyValue = rosyValue + chestCavity.getOrganScore('chestcavity:defense') * chestCavity.inventory.countNonEmpty()
            break
        }
    }
    customData.armor.addAttributeModifier(rosyValue * 0.125, 'addition', 'base')
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_rib')
        .addStrategy('chest_cavity_update', RoseQuartzRibChestCavityUpdate)
)

/** ============================================================== */

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.NetworkEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoseQuartzDialyzerKeyActiveOnly(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const chestCavity = player.chestCavityInstance
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy')
    switch (slotType) {
        case 'rosy_explosion': {
            rosyValue = rosyValue + chestCavity.getOrganScore('chestcavity:filtration') * chestCavity.inventory.countNonEmpty()
            break
        }
    }
    let repairValue = rosyValue * 3
    for (let i = 0; i < chestCavity.inventory.getContainerSize(); i++) {
        let item = chestCavity.inventory.getItem(i)
        if (item.getMaxDamage() <= 0) continue
        let damgeValue = item.getDamageValue()
        if (repairValue > damgeValue) {
            repairValue = repairValue - damgeValue
            item.setDamageValue(0)
        } else {
            item.setDamageValue(damgeValue - repairValue)
            repairValue = 0
            break
        }
    }
    player.addItemCooldown(organItem, 20 * 60)
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_dialyzer')
        .addOnlyStrategy('key_active', RoseQuartzDialyzerKeyActiveOnly)
)

/** ============================================================== */

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoseQuartzLiverChestCavityUpdateOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy')
    switch (slotType) {
        case 'rosy_explosion': {
            rosyValue = rosyValue * 1.5 + chestCavity.getOrganScore('chestcavity:detoxification') * chestCavity.inventory.countNonEmpty() * 0.5
            break
        }
    }
    chestCavity.setOrganScore('kubejs:rosy', rosyValue)
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_liver')
        .addOnlyStrategy('chest_cavity_update', RoseQuartzLiverChestCavityUpdateOnly)
)