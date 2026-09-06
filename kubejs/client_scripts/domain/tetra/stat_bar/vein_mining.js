// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:vein_mining')
        .setMin(0)
        .setMax(300)
        .setLabelGetter('integerlabel')
        .setStatGetter(TetraStatBarHelper.effectEfficiency('kubejs:vein_mining', 5, 20))
        .addIntegerTooltip(TetraStatBarHelper.effectLevel('kubejs:vein_mining', 1, 5))
        .addIntegerTooltip(TetraStatBarHelper.effectEfficiency('kubejs:vein_mining', 5, 20))
})