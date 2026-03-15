// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:beheading')
        .setMin(0)
        .setMax(100)
        .setLabelGetter('percentagelabel')
        .setStatGetter(TetraJS$StatBarHelper.effectLevel('kubejs:beheading', 2, 0))
        .addIntegerTooltip(TetraJS$StatBarHelper.effectLevel('kubejs:beheading', 2, 0))
})