// priority: 500

RegistryOrgan('kubejs:factory_heart')
    .addScore('kubejs:stress', 4)
    .addScore('chestcavity:health', 1)
    .setRank(3)
    .setCanSpawn(false)
/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function FactoryHeartChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
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
 * 处理器官事件：organ_take_on。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function FactoryHeartOrganTakeOn(customData, event, organItem, organIndex, slotType) {
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
function FactoryHeartOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    OrganSkinRemove(entity, 'chest', 'secret/chestcavity/factory_slot')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:factory_heart')
        .addOnlyStrategy('chest_cavity_update', FactoryHeartChestCavityUpdate)
        .addOnlyStrategy('organ_take_on', FactoryHeartOrganTakeOn)
        .addOnlyStrategy('organ_take_off', FactoryHeartOrganTakeOff)
)
