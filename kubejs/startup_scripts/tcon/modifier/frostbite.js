// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('frostbite', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const source = context.getAttacker()
            /**@type {Internal.PathfinderMob} */
            const target = context.target
            let forzenTicks = target.getTicksFrozen()
            if (forzenTicks > 0) {
                let attackDamage = source.getAttributeValue('minecraft:generic.attack_damage')
                amount = amount + forzenTicks / 100 * lvl * attackDamage
            }
        })
    })
})