// priority: 500
RegistryOrgan('kubejs:rose_quartz_muscle')
    .addScore('chestcavity:strength', 1.5)
    .addScore('chestcavity:nerves', -0.25)
    .addScore('kubejs:rosy', 0.5)

RegistryOrgan('kubejs:rose_quartz_heart')
    .addScore('chestcavity:health', 1.5)
    .addScore('chestcavity:nerves', -0.25)
    .addScore('kubejs:rosy', 0.5)

RegistryOrgan('kubejs:rose_quartz_rib')
    .addScore('chestcavity:defense', 1.5)
    .addScore('chestcavity:nerves', -0.25)
    .addScore('kubejs:rosy', 0.5)

RegistryOrgan('kubejs:rose_quartz_dialyzer')
    .addScore('chestcavity:filtration', 1.5)
    .addScore('chestcavity:nerves', -0.25)
    .addScore('kubejs:rosy', 0.5)

RegistryOrgan('kubejs:rose_quartz_liver')
    .addScore('chestcavity:detoxification', 1.5)
    .addScore('chestcavity:nerves', -0.25)
    .addScore('kubejs:rosy', 1.0)

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
    customData.attackDamage.addAttributeModifier(rosyValue, 'addition', 'base')
    switch (slotType) {
        case 'rosy_explosion':
            // 爆发条件下，将临时玫瑰化全部转换为乘区 * 0.01
            customData.attackDamage.addAttributeModifier(GetCustomDataOrDefault(customData, 'tempRosy', 0) * 0.01, 'multiple', 'all')
            customData['tempRosy'] = 0
            return
        default:
            // 普通条件下，积累当前格子的临时玫瑰化
            customData['tempRosy'] = GetCustomDataOrDefault(customData, 'tempRosy', 0) + 1
            return
    }
}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function RoseQuartzMuscleMpmRender(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    let player = event.entity
    let mpmData = new MpmDataModel('kubejs:parts/arms/rose_arm_slim_model.json').exportModelData()
    if (player.profile.isLegacy()) {
         mpmData = new MpmDataModel('kubejs:parts/arms/rose_arm_wide_model.json').exportModelData()
    }
    customData.mpmParts.push(mpmData)
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_muscle')
        .addStrategy('chest_cavity_update', RoseQuartzMuscleChestCavityUpdate)
        .addOnlyStrategy('mpm_render', RoseQuartzMuscleMpmRender)
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
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy')
    customData.maxHealth.addAttributeModifier(rosyValue, 'addition', 'base')
    switch (slotType) {
        case 'rosy_explosion':
            // 爆发条件下，将临时玫瑰化全部转换为乘区生命值*0.01
            customData.maxHealth.addAttributeModifier(GetCustomDataOrDefault(customData, 'tempRosy', 0) * 0.01, 'multiple', 'all')
            customData['tempRosy'] = 0
            return
        default:
            // 普通条件下，积累当前格子的临时玫瑰化
            customData['tempRosy'] = GetCustomDataOrDefault(customData, 'tempRosy', 0) + 1
            return
    }
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

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_heart')
        .addStrategy('chest_cavity_update', RoseQuartzHeartChestCavityUpdate)
        .addOnlyStrategy('mpm_render', RoseQuartzHeartMpmRender)
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
    customData.armor.addAttributeModifier(rosyValue * 0.1, 'addition', 'base')
    switch (slotType) {
        case 'rosy_explosion':
            // 爆发条件下，将临时玫瑰化全部转换为乘区生命值*0.01
            customData.armor.addAttributeModifier(GetCustomDataOrDefault(customData, 'tempRosy', 0) * 0.01, 'multiple', 'all')
            customData['tempRosy'] = 0
            return
        default:
            // 普通条件下，积累当前格子的临时玫瑰化
            customData['tempRosy'] = GetCustomDataOrDefault(customData, 'tempRosy', 0) + 1
            return
    }
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_rib')
        .addStrategy('chest_cavity_update', RoseQuartzRibChestCavityUpdate)
)

/** ============================================================== */

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoseQuartzDialyzerChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let machinizedValue = chestCavity.getOrganScore('kubejs:mechanized')
    chestCavity.setOrganScore('kubejs:mechanized', 0)
    switch (slotType) {
        case 'rosy_explosion':
            // 爆发条件下，机械化值全部转换为实际玫瑰化属性
            chestCavity.setOrganScore('kubejs:rosy', chestCavity.getOrganScore('kubejs:rosy') + machinizedValue)
            return
        default:
            // 普通条件下，积累当前格子的临时玫瑰化
            customData['tempRosy'] = GetCustomDataOrDefault(customData, 'tempRosy', 0) + machinizedValue
            return
    }
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_dialyzer')
        .addStrategy('chest_cavity_update', RoseQuartzDialyzerChestCavityUpdate)
)

/** ============================================================== */

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoseQuartzLiverChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    switch (GetChestCavitySlotType(chestCavity, organIndex)) {
        case 'rosy_explosion':
            // 爆发条件下，将临时玫瑰化全部转换为实际玫瑰化属性
            chestCavity.setOrganScore('kubejs:rosy', chestCavity.getOrganScore('kubejs:rosy') + GetCustomDataOrDefault(customData, 'tempRosy', 0) / 2)
            customData['tempRosy'] = 0
            return
        default:
            // 普通条件下，积累当前格子的临时玫瑰化
            customData['tempRosy'] = GetCustomDataOrDefault(customData, 'tempRosy', 0) + 3
            return
    }

}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_liver')
        .addStrategy('chest_cavity_update', RoseQuartzLiverChestCavityUpdate)
)