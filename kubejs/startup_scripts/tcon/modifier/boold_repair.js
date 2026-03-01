// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('boold_repair', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            if (entity.age % 20 != 0) return
            if (itemStack.getDamageValue() <= 0) return
            let repairedValue = lvl * 3
            if (entity.getHealth() <= 1) return
            entity.attack(level.damageSources().magic(), 1)
            itemStack.setDamageValue(Math.max(itemStack.getDamageValue() - repairedValue, 0))
        })
    })

})