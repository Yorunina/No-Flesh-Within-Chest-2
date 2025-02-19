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
 */
function RoseQuartzMuscleChestCavityUpdate(customData, event, organItem, organIndex) {
    const chestCavity = event.chestCavity
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy')
    customData.attackDamage.addAttributeModifier(rosyValue, 'addition', 'base')
    switch (GetChestCavitySlotType(chestCavity, organIndex)) {
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
OrganChestCavityUpdateStrategy.addStrategy('kubejs:rose_quartz_muscle', RoseQuartzMuscleChestCavityUpdate)

/** ============================================================== */

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function RoseQuartzHeartChestCavityUpdate(customData, event, organItem, organIndex) {
    const chestCavity = event.chestCavity
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy')
    customData.maxHealth.addAttributeModifier(rosyValue, 'addition', 'base')
    switch (GetChestCavitySlotType(chestCavity, organIndex)) {
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
OrganChestCavityUpdateStrategy.addStrategy('kubejs:rose_quartz_heart', RoseQuartzHeartChestCavityUpdate)

/** ============================================================== */

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function RoseQuartzRibChestCavityUpdate(customData, event, organItem, organIndex) {
    const chestCavity = event.chestCavity
    let rosyValue = chestCavity.getOrganScore('kubejs:rosy')
    customData.armor.addAttributeModifier(rosyValue * 0.1, 'addition', 'base')
    switch (GetChestCavitySlotType(chestCavity, organIndex)) {
        case 'rosy_explosion':
            // 爆发条件下，将临时玫瑰化全部转换为乘区生命值*0.01
            console.log(GetCustomDataOrDefault(customData, 'tempRosy', 0))
            customData.armor.addAttributeModifier(GetCustomDataOrDefault(customData, 'tempRosy', 0) * 0.01, 'multiple', 'all')
            customData['tempRosy'] = 0
            return
        default:
            // 普通条件下，积累当前格子的临时玫瑰化
            customData['tempRosy'] = GetCustomDataOrDefault(customData, 'tempRosy', 0) + 1
            return
    }
}
OrganChestCavityUpdateStrategy.addStrategy('kubejs:rose_quartz_rib', RoseQuartzRibChestCavityUpdate)

/** ============================================================== */

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function RoseQuartzDialyzerChestCavityUpdate(customData, event, organItem, organIndex) {
    const chestCavity = event.chestCavity
    let machinizedValue = chestCavity.getOrganScore('kubejs:mechanized')
    chestCavity.setOrganScore('kubejs:mechanized', 0)
    switch (GetChestCavitySlotType(chestCavity, organIndex)) {
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
OrganChestCavityUpdateStrategy.addStrategy('kubejs:rose_quartz_dialyzer', RoseQuartzDialyzerChestCavityUpdate)

/** ============================================================== */

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function RoseQuartzLiverChestCavityUpdate(customData, event, organItem, organIndex) {
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
OrganChestCavityUpdateStrategy.addStrategy('kubejs:rose_quartz_liver', RoseQuartzLiverChestCavityUpdate)