// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:flame_strike')
        .setMin(0)
        .setMax(1000)
        .setLabelGetter('percentagelabel')
        .setStatGetter(TetraStatBarHelper.effectEfficiency('kubejs:flame_strike', 50, 0))
        .addIntegerTooltip(TetraStatBarHelper.effectLevel('kubejs:flame_strike', 10, 0))
        .addIntegerTooltip(TetraStatBarHelper.effectEfficiency('kubejs:flame_strike', 50, 0))
})

