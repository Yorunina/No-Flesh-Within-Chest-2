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

    event.createNew('shield_slam', builder => {
        builder.canBlockAttacked((toolView, lvl, context, slotType, source, amount) => {
            if (!source.actual || !source.actual.isAlive()) return false
            const entity = context.entity
            if (!entity.isBlocking()) return false
            const level = context.level
            let damageAmount = entity.getArmorValue() * lvl * 0.5
            source.actual.attack(level.damageSources().mobAttack(entity), damageAmount)
            TinkerDamageHelper.damageAnimated(toolView, amount, entity, slotType);
            return true
        })
    })
})