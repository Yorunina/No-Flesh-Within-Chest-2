// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('flame_defense', builder => {
        builder.armorTakeAttacked((toolView, lvl, context, slotType, source, amount) => {
            const sourceEntity = source.actual
            if (!sourceEntity && sourceEntity.isAlive()) return
            sourceEntity.setRemainingFireTicks(sourceEntity.getRemainingFireTicks() + 20 * lvl)
            return true
        })
    })
})