// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:vein_mining')
        .setMin(0)
        .setMax(1)
        .setLabelGetter('integerlabel')
        .setStatGetter(TetraStatBarHelper.effectLevel('kubejs:vein_mining', 1, 0))
        .addIntegerTooltip(TetraStatBarHelper.effectLevel('kubejs:vein_mining', 1, 0))


    event.registerAttributeBar('ftbultimine:max_blocks_modifier')
        .setMin(0)
        .setMax(300)
        .setLabelGetter('integerlabel')
        .setAttributeGetterType('addition')
        .addIntegerTooltip(TetraStatBarHelper.attributeAddition('ftbultimine:max_blocks_modifier'))
})

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