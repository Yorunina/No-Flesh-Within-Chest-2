// priority: 500

RegistryOrgan('kubejs:mechanical_drill')
    .addScore('kubejs:stress', -5)

/**
 * 检查电钻是否有效安装；连锁挖掘过程仍由 FTBUltimine 处理。
 * @param {Internal.Player} player
 * @returns {boolean}
 */
function hasActiveMechanicalDrill(player) {
    if (!player.chestCavityInstance) return false
    return player.chestCavityInstance.getOrganQueryIndex().hasItem('kubejs:mechanical_drill', true, null)
}

MAAEvents.canUltimine(event => {
    const player = event.player
    if (!player || !hasActiveMechanicalDrill(player)) return
    if (player.chestCavityInstance.getOrganScore('kubejs:stress') < 0) return
    event.success()
})
