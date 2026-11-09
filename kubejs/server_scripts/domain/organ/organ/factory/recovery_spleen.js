// priority: 500

RegistryOrgan('kubejs:recovery_spleen')
    .addScore('chestcavity:metabolism', 1)
    .setRank(3)
    .setCanSpawn(false)

/**
 * 处理器官事件：entity_be_hurt。
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function RecoverySpleenEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    entity.heal(2)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:recovery_spleen')
        .addOnlyStrategy('entity_be_hurt', RecoverySpleenEntityBeHurt)
)