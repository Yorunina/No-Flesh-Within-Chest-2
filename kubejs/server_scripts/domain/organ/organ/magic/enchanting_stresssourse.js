// priority: 500
RegistryOrgan('kubejs:enchanting_stresssourse')
    .addScore('kubejs:stress', 1)
    .addScore('kubejs:magic_capacity', 2)
/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function enchantingStresssourseChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = entity.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let aroundSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, EightDirectionOffset)
    for (let slotDef of aroundSlots) {
        let curItem = ccInv.getStackInSlot(slotDef.getId())
        if (curItem.isEmpty()) continue
        if (curItem.getId() != 'minecraft:enchanted_book') continue
        let enchantMap = curItem.getEnchantments()
        if (enchantMap.isEmpty()) continue
        let firstKey = enchantMap.keySet().iterator().next()
        let enchantId = String(firstKey)
        let enchantLevel = enchantMap.get(firstKey)
        let level = entity.totalExperience
        if (level < enchantLevel * 10) return
        let organEnchantMap = organItem.getEnchantments()
        let hasEnchant = organEnchantMap.containsKey(enchantId)
        if (hasEnchant) continue
        curItem.shrink(1)
        entity.giveExperiencePoints(-enchantLevel * 10)
        let targetSlotType = chestCavity.inventoryTypeData.getSlotType(organIndex)
        SetChestCavityOrgan(customData, chestCavity, organItem.enchant(enchantId, enchantLevel), organIndex, targetSlotType, true)
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
function enchantingStresssourseSwitch(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    let enchantments = organItem.getEnchantments().size()
    chestCavity.setOrganScore('kubejs:stress', stressValue + enchantments * 0.25)
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:enchanting_stresssourse')
        .addOnlyStrategy('chest_cavity_update', enchantingStresssourseChestCavityUpdate)
        .addOnlyStrategy('chest_cavity_update', enchantingStresssourseSwitch, 10)
)
