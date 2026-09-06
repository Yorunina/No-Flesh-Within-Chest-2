// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:seeking_arrow')
        .setMin(0)
        .setMax(50)
        .setLabelGetter('integerlabel')
        .setStatGetter(TetraStatBarHelper.effectLevel('kubejs:seeking_arrow', 1, 10))
        .addIntegerTooltip(TetraStatBarHelper.effectLevel('kubejs:seeking_arrow', 1, 10))
        .addTowDecimalTooltip(TetraStatBarHelper.effectEfficiency('kubejs:seeking_arrow', 0.25, 1))
})
