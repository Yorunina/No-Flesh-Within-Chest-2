// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:flame_strike')
        .setMin(0)
        .setMax(500)
        .setLabelGetter('percentagelabel')
        .setStatGetter(TetraJS$StatBarHelper.effectEfficiency('kubejs:flame_strike', 20, 0))
        .addIntegerTooltip(TetraJS$StatBarHelper.effectLevel('kubejs:flame_strike', 30, 0))
        .addIntegerTooltip(TetraJS$StatBarHelper.effectEfficiency('kubejs:flame_strike', 20, 0))
})

