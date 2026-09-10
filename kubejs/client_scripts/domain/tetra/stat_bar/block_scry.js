// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:block_scry')
        .setMin(0)
        .setMax(300)
        .setLabelGetter('integerlabel')
        .setStatGetter(TetraStatBarHelper.effectLevel('kubejs:block_scry', 2, 2))
        .addIntegerTooltip(TetraStatBarHelper.effectLevel('kubejs:block_scry', 2, 2))
        .addIntegerTooltip(TetraStatBarHelper.effectEfficiency('kubejs:block_scry', 4, 8))
})
