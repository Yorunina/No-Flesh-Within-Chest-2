// priority: 500
RegistryOrgan('kubejs:genius')
    .addScore('kubejs:stress', 1)
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
function GeniusChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const entity = event.entity
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    const effects = entity.getActiveEffects()
    const effectCount = effects.size()
    stressValue = stressValue + effectCount
    chestCavity.setOrganScore('kubejs:stress', stressValue)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:genius')
        .addOnlyStrategy('chest_cavity_update', GeniusChestCavityUpdate, 10)
)
