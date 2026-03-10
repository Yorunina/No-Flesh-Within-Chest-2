// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:burns')
        .setMin(0)
        .setMax(100)
        .setMultiplier(10)
        .setLabelGetter('percentagelabel')
        .addIntegerTooltip(TetraJS$StatBarHelper.effectLevel('kubejs:burns', 10, 0))
        .addIntegerTooltip(TetraJS$StatBarHelper.effectEfficiency('kubejs:burns', 1, 0))
})

