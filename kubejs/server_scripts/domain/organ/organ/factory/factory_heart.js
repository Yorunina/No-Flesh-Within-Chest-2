// priority: 500

RegistryOrgan('kubejs:factory_heart')
    .addScore('kubejs:stress', 4)
    .addScore('chestcavity:health', 1)
/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function factoryHeartMoveOutput(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    if (slotType != FactoryCoreSlot) return
    const chestCavity = player.chestCavityInstance
    const inventory = chestCavity.inventory
    let finalIndex = chestCavity.inventory.find('kubejs:final_fabritem')
    if (finalIndex == 18) {
        let firstItem = inventory.getStackInSlot(10)
        if (!firstItem.isEmpty()) return
        let finalItem = inventory.getStackInSlot(finalIndex)
        let newItem = finalItem.copy()
        finalItem.shrink(1)
        let targetIndex = 10
        let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
        SetChestCavityOrgan(customData, chestCavity, newItem, targetIndex, targetSlotType, false)
    }
}

/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function factoryHeartChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    if (slotType == FactoryCoreSlot) {
        const chestCavity = event.chestCavity
        let factoryCount = GetTagCount(chestCavity, 'kubejs:factory')
        if (factoryCount > 1) {
            chestCavity.setOrganScore('chestcavity:nerves', 1)
        }
        if (factoryCount > 2) {
            chestCavity.setOrganScore('chestcavity:breath_recovery', 2)
            chestCavity.setOrganScore('chestcavity:breath_capacity', 2)
        }
        if (factoryCount > 3) {
            chestCavity.setOrganScore('chestcavity:filtration', 2)
        }
        if (factoryCount > 4) {
            chestCavity.setOrganScore('chestcavity:endurance', 2)
        }
        if (factoryCount > 5) {
            chestCavity.setOrganScore('chestcavity:metabolism', 1)
        }
        if (factoryCount > 6) {
            chestCavity.setOrganScore('chestcavity:detoxification', 1)
        }
        if (factoryCount > 7) {
            chestCavity.setOrganScore('chestcavity:nutrition', 2)
        }
        if (factoryCount > 8) {
            chestCavity.setOrganScore('chestcavity:digestion', 1)
        }
        if (factoryCount > 9) {
            chestCavity.setOrganScore('chestcavity:ease_of_access', 1)
        }
    }
}

/**
 * 处理器官事件：organ_take_on。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function factoryHeartArmorTakeOn(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    OrganSkinAdd(entity, 'chest', 'secret/chestcavity/factory_slot')
}

/**
 * 处理器官事件：organ_take_off。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function factoryHeartArmorTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    OrganSkinRemove(entity, 'chest', 'secret/chestcavity/factory_slot')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:factory_heart')
        .addOnlyStrategy('chest_cavity_update', factoryHeartMoveOutput)
        .addOnlyStrategy('chest_cavity_update', factoryHeartChestCavityUpdate)
        .addOnlyStrategy('organ_take_on', factoryHeartArmorTakeOn)
        .addOnlyStrategy('organ_take_off', factoryHeartArmorTakeOff)
)
