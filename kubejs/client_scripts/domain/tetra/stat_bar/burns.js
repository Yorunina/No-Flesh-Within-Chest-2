// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:burns')
        .setMin(0)
        .setMax(100)
        .setMultiplier(10)
        .setLabelGetter('percentagelabel')
        .addIntegerTooltip(TetraStatBarHelper.effectLevel('kubejs:burns', 10, 0))
        .addIntegerTooltip(TetraStatBarHelper.effectEfficiency('kubejs:burns', 1, 0))
})

