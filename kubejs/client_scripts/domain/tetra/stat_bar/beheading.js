// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:beheading')
        .setMin(0)
        .setMax(100)
        .setLabelGetter('percentagelabel')
        .setStatGetter(TetraStatBarHelper.effectLevel('kubejs:beheading', 2, 0))
        .addIntegerTooltip(TetraStatBarHelper.effectLevel('kubejs:beheading', 2, 0))
})