// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:frag_arrow')
        .setMin(0)
        .setMax(300)
        .setLabelGetter('percentagelabel')
        .setStatGetter(TetraJS$StatBarHelper.effectEfficiency('kubejs:frag_arrow', 10, 10))
        .addOneDecimalTooltip(TetraJS$StatBarHelper.effectLevel('kubejs:frag_arrow', 0.5, 2))
        .addIntegerTooltip(TetraJS$StatBarHelper.effectEfficiency('kubejs:frag_arrow', 10, 10))
})

