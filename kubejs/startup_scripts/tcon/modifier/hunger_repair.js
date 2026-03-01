// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('hunger_repair', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            if (!entity instanceof $ServerPlayer) return
            if (entity.age % 20 != 0) return
            if (itemStack.getDamageValue() <= 0) return
            let repairedValue = lvl * 3
            if (entity.foodData.getFoodLevel() <= 1) return
            entity.foodData.addExhaustion(2)
            itemStack.setDamageValue(Math.max(itemStack.getDamageValue() - repairedValue, 0))
        })
    })
})