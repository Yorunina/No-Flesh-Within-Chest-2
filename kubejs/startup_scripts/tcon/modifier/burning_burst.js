// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('burning_burst', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            /**@type {Internal.PathfinderMob} */
            const target = context.target
            if (target.isOnFire()) {
                let fireTicks = target.getRemainingFireTicks()
                target.setRemainingFireTicks(0)
                amount = amount + fireTicks / 10 * lvl
            }
        })
    })
})