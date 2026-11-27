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
