// priority: 500

RegistryOrgan('kubejs:purgatory')
    .addScore('chestcavity:defense', -2)
/**
 * 处理器官事件：entity_do_damage。
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function purgatoryEntityDodamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const player = event.source.actual
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    if (organItem.getDamageValue() + 10 <= organItem.getMaxDamage()) {
        organItem.setDamageValue(organItem.getDamageValue() + 10)
        const query = chestCavity.getOrganQueryIndex()
        if (query.hasItem('kubejs:mechanical_press', true, MachinaryLubricant)) {
            // 联动条件检查安装槽，修复目标仍取全库存首个压片机。
            let pressIndex = query.findItem('kubejs:mechanical_press', false, null)
            if (pressIndex > -1) {
                let pressItem = ccInv.getStackInSlot(pressIndex)
                if (!pressItem.isEmpty() && pressItem.getId() == 'kubejs:mechanical_press'
                    && pressItem.getDamageValue() - 5 <= pressItem.getMaxDamage()) {
                    pressItem.setDamageValue(pressItem.getDamageValue() - 5)
                }
            }
        }
    }
    if (organItem.getDamageValue() == 100) {
        const invTypeData = chestCavity.getInventoryTypeData()
        let leftSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[-1, 0]])
        if (leftSlot.length == 0) return
        let leftSlotIndex = leftSlot[0].getId()
        let replacementItem = ccInv.getStackInSlot(leftSlotIndex)
        if (!replacementItem.isEmpty()) return
        let newItem = organItem.copy()
        organItem.shrink(1)
        newItem.setDamageValue(0)
        let targetSlotType = chestCavity.inventoryTypeData.getSlotType(leftSlotIndex)
        SetChestCavityOrgan(customData, chestCavity, newItem, leftSlotIndex, targetSlotType, true)
    }
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:purgatory')
        .addOnlyStrategy('entity_do_damage', purgatoryEntityDodamage)
)
