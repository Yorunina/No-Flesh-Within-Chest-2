// priority: 500
TetraJSEvents.registerStatBar(event => {
    const level = TetraStatBarHelper.effectLevel('kubejs:construction')
    event.registerEffectBar('kubejs:construction')
        .setMax(192)
        .setStatGetter(TetraStatBarHelper.multiply(3, level, level))
})
