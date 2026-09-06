// priority: 500
TetraCustomCraftingEffectCondition.register('nerves_inspiration', ctx => {
    const player = ctx.player()
    const level = ctx.world()
    if (level.isClientSide()) return false
    let chestCavityInstance = player.getChestCavityInstance()
    if (!chestCavityInstance) return false
    if (chestCavityInstance.getOrganScoreOrDefault('chestcavity:nerves', 0) >= 10) return true 
    return false
})