// priority: 500
RegistryOrgan('kubejs:steam_engine')
    .addScore('kubejs:stress', 3)
/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function steamEngineChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    if (slotType == RevolutionFlame) {
        let stressValue = chestCavity.getOrganScore('kubejs:stress')
        if (chestCavity.getOrganQueryIndex().hasItem('kubejs:burning_heart', false, null)) {
            chestCavity.setOrganScore('kubejs:stress', (stressValue + 5) * 2)
            player.level.playSound(null, player.getX(), player.getY(), player.getZ(), 'create:steam', player.getSoundSource(), 3, 1)
        } else {
            chestCavity.setOrganScore('kubejs:stress', stressValue + 5)
        }
    }
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:steam_engine')
        .addStrategy('chest_cavity_update', steamEngineChestCavityUpdate, 5)
)
