// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('deposition', builder => {
        builder.getMeleeDamage((view, lvl, context, base, final) => {
            let target = context.target
            let fireTicks = target.getRemainingFireTicks()
            if (fireTicks > 0) {
                let multiplier = 1 + fireTicks/100 * lvl
                return final * multiplier
            }
            return final
        })
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            let target = context.target
            let fireTicks = target.getRemainingFireTicks()
            if (fireTicks > 0) {
                target.setRemainingFireTicks(0)
            }
        })

    })
})    