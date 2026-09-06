// priority: 500
TetraCustomCraftingEffectCondition.register('effect_inspiration', ctx => {
    const level = ctx.world()
    const player = ctx.player()
    if (level.isClientSide()) return false
    return player.getActiveEffects().size() >= 5
})