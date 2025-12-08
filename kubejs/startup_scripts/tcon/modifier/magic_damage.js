TConJSEvents.modifierRegistry(event => {
    event.createNew("magic_damage", (builder) => {
        builder.addToolStats((view, lvl, statsBuilder) => {
            TinkerToolStats.ATTACK_DAMAGE.multiply(statsBuilder, 1 + lvl * 0.1)
            TinkerToolStats.PROJECTILE_DAMAGE.multiply(statsBuilder, 1 + lvl * 0.1)
        })
    })
})