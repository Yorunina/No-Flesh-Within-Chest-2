// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('freezing_defense', builder => {
        builder.armorTakeAttacked((toolView, lvl, context, slotType, source, amount) => {
            const wearer = context.entity
            if (!wearer || !wearer.isAlive()) return
            let forzenTicks = wearer.getTicksFrozen()
            wearer.setTicksFrozen(forzenTicks + 5 * lvl)
            if (forzenTicks > 300) {
                wearer.heal(5 * lvl)
                wearer.setTicksFrozen(100)
            }
            return true
        })
    })    
})