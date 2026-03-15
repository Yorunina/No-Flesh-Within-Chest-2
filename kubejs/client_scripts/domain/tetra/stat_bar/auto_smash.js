// priority: 500
TetraJSEvents.registerStatBar(event => {
    event.registerEffectBar('kubejs:auto_smash')
        .setMin(0)
        .setMax(1)
        .setLabelGetter('integerlabel')
        .setStatGetter(TetraJS$StatBarHelper.effectLevel('kubejs:auto_smash', 1, 0))
        .addIntegerTooltip(TetraJS$StatBarHelper.effectLevel('kubejs:auto_smash', 1, 0))
})