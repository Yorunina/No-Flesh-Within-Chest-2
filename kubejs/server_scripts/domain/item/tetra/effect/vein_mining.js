// priority: 500
/**
 * @param {Object} customData
 * @param {Internal.CanUltimineEventJS} event
 */
function VeinMiningCanUltimine(customData, event) {
    const player = event.player
    if (!player) return
    const stack = player.mainHandItem
    if (!stack || stack.isEmpty()) return
    /**@type {Internal.ModularItem} */
    const item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item)) return
    if (item.getEffectLevel(stack, 'kubejs:vein_mining') <= 0) return
    event.success()
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:vein_mining')
        .addStrategy('can_ultimine', VeinMiningCanUltimine)
)
