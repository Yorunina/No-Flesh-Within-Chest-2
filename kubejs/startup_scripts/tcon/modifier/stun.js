// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('stun', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive() && Math.random() < 0.1 * lvl) {
                target.potionEffects.add('cataclysm:stun', 20, 0, false, false)
            }
        })
    })
})