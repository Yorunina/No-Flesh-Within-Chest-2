// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('burning', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            /**@type {Internal.PathfinderMob} */
            const target = context.target
            let fireTicks = target.getRemainingFireTicks()
            target.setRemainingFireTicks(fireTicks + 20 * lvl)
        })
    })
})