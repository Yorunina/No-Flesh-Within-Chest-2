// priority: 500
TetraCustomCraftingEffectCondition.register('durability_inspiration', ctx => {
    const level = ctx.world()
    const stack = ctx.upgradedStack()
    if (level.isClientSide()) return false
    return stack.getMaxDamage() >= 2000
})