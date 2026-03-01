// priority: 500
TConJSEvents.modifierRegistry(event => {
    // 盾牌猛击 在身着此类护甲时，如果使用了盾牌进行防御，那么敌人将会受到等同于护甲的伤害，但你的护甲会受到等同于原本伤害的耐久损伤
    // 对于格挡事件，只要有一个return true，后续方法就不会接着执行，因此这个效果仅会对第一个生效的护甲生效
    event.createNew('shield_slam', builder => {
        builder.canBlockAttacked((toolView, lvl, context, slotType, source, amount) => {
            if (!source.actual || !source.actual.isAlive()) return false
            const entity = context.entity
            if (!entity.isBlocking()) return false
            const level = context.level
            let damageAmount = entity.getArmorValue() * lvl * 0.5
            source.actual.attack(level.damageSources().thorns(entity), damageAmount)
            TinkerDamageHelper.damageAnimated(toolView, amount, entity, slotType)
            return true
        })
    })
})