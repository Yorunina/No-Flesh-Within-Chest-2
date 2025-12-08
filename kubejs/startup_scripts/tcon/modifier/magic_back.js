TConJSEvents.modifierRegistry(event => {
    event.createNew("magic_back", (builder) => {
        builder.armorTakeAttacked((view, lvl, context, slot, source, damage) => {
            let returned = source.actual || source.immediate;
            if (returned != null) {
                let back = damage * (0.5 + lvl)
                returned.attack(source, back)
                }
                return true
                })
    })
})