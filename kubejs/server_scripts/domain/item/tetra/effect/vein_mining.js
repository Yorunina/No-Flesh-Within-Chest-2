// priority: 500
MAAEvents.canUltimine(event => {
    const player = event.player
    if (!player) return
    const stack = player.mainHandItem
    if (!stack || stack.isEmpty()) return
    /**@type {Internal.ModularItem} */
    const item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item)) return
    if (item.getEffectLevel(stack, 'kubejs:vein_mining') <= 0) return
    event.success()
})