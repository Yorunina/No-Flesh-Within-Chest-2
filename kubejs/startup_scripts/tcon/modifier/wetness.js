// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('wetness', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive()) {
                target.potionEffects.add('cataclysm:wetness', 20 * 5 * lvl, lvl, false, false)
            }
        })
    })
})