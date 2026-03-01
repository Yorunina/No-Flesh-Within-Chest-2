// priority: 500
TConJSEvents.modifierRegistry(event => {
    // 盾牌防护：当盾牌受到攻击时，概率会恢复耐久
    event.createNew('shield_protection', builder => {
        builder.canBlockAttacked((toolView, lvl, context, slotType, source, amount) => {
            const entity = context.entity
            if (!entity.isBlocking()) return false
            TinkerDamageHelper.repair(toolView, lvl)
            return true
        })
    })
})