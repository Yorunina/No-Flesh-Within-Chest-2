// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('freezing', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            /**@type {Internal.PathfinderMob} */
            const target = context.target
            let forzenTicks = target.getTicksFrozen()
            target.setTicksFrozen(forzenTicks + 20 * lvl)
        })
    })
})