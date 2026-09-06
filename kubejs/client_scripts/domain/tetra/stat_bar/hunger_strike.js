// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:hunger_strike')
        .setMin(0)
        .setMax(500)
        .setLabelGetter('percentagelabel')
        .setStatGetter(TetraStatBarHelper.effectEfficiency('kubejs:hunger_strike', 10, 0))
        .addIntegerTooltip(TetraStatBarHelper.effectLevel('kubejs:hunger_strike', 1, 0))
        .addIntegerTooltip(TetraStatBarHelper.effectEfficiency('kubejs:hunger_strike', 10, 0))
})