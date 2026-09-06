// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:auto_smash')
        .setMin(0)
        .setMax(1)
        .setLabelGetter('integerlabel')
        .setStatGetter(TetraStatBarHelper.effectLevel('kubejs:auto_smash', 1, 0))
        .addIntegerTooltip(TetraStatBarHelper.effectLevel('kubejs:auto_smash', 1, 0))
})