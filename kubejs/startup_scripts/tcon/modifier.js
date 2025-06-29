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

    // 盾牌猛击 在身着此类护甲时，如果使用了盾牌进行防御，那么敌人将会受到等同于护甲的伤害，但你的护甲会受到等同于原本伤害的耐久损伤
    // 对于格挡事件，只要有一个return true，后续方法就不会接着执行，因此这个效果仅会对第一个生效的护甲生效
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

    // // 心室震颤；在造成伤害时，对对方的健康造成轻微损伤，允许突破到0以下
    // event.createNew('ventricular_fibrillation', builder => {
    //     builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
    //         const target = context.target
    //         const chestCavity = target.chestCavityInstance
    //         if (!target.isAlive() || !chestCavity) return
    //         chestCavity.setOrganScore('chestcavity:health', chestCavity.getOrganScore('chestcavity:health') - 0.01 * lvl)
    //     })
    // })

    // 标记目标；在造成暴击伤害时，对目标施加标记效果，持续 5 * 等级 秒   
    event.createNew('marking_target', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            /**@type {Internal.LivingEntity} */
            const target = context.target
            if (context.isCritical() && target && target.isAlive()) {
                target.potionEffects.add('kubejs:marked', 20 * 5 * lvl, 0, false, false)
            }
        })
    })
})