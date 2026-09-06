// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:frag_arrow')
        .setMin(0)
        .setMax(300)
        .setLabelGetter('percentagelabel')
        .setStatGetter(TetraStatBarHelper.effectEfficiency('kubejs:frag_arrow', 10, 10))
        .addOneDecimalTooltip(TetraStatBarHelper.effectLevel('kubejs:frag_arrow', 0.5, 2))
        .addIntegerTooltip(TetraStatBarHelper.effectEfficiency('kubejs:frag_arrow', 10, 10))
})

