// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('fire_protection', builder => {
        builder.armorTakeAttacked((toolView, lvl, context, slotType, source, amount) => {
            const wearer = context.entity
            if (!wearer || !wearer.isAlive()) return
            let fireTicks = wearer.getRemainingFireTicks()
            if (fireTicks > 10) {
              wearer.heal(lvl) 
              wearer.setRemainingFireTicks(0)
            }
            return true
        })
    })    
})