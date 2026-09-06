// priority: 500
TetraCustomCraftingEffectCondition.register('enchant_inspiration', ctx => {
    const level = ctx.world()
    const stack = ctx.upgradedStack()
    if (level.isClientSide()) return false
    let enchantLevel = 0
    stack.enchantments.forEach((enchantment, pLevel) => {
        enchantLevel = enchantLevel + pLevel
    })
    return enchantLevel >= 5
})