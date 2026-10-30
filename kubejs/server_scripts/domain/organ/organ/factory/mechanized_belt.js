// priority: 500

RegistryOrgan('kubejs:mechanized_belt')

/**
 * 处理器官事件：organ_take_on。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function machineBeltTakeOn(customData, event, organItem, organIndex, slotType) {
    if (slotType == MachinaryLubricant) {
        RemoveCustomDataMap(event.entity.chestCavityInstance, 'beltEnabled')
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:mechanized_belt')
        .addOnlyStrategy('organ_take_on', machineBeltTakeOn)
)
