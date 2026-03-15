// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:vein_mining')
        .setMin(0)
        .setMax(300)
        .setLabelGetter('integerlabel')
        .setStatGetter(TetraJS$StatBarHelper.effectEfficiency('kubejs:vein_mining', 5, 20))
        .addIntegerTooltip(TetraJS$StatBarHelper.effectLevel('kubejs:vein_mining', 1, 5))
        .addIntegerTooltip(TetraJS$StatBarHelper.effectEfficiency('kubejs:vein_mining', 5, 20))
})