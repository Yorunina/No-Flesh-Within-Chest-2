// priority: 500

TetraCustomRequirement.register('tearing_spear', /** @param {Internal.CraftingContext} ctx */ ctx => {
    const player = ctx.player
    const level = ctx.world
    const stack = ctx.targetStack

    if (!level || level.isClientSide()) {
        if (AStagesClient.serverAndPlayerHasStage('ftb_genesis_process_done')) return true
    } else {
        if (AStages.serverAndPlayerHasStage(player, 'ftb_genesis_process_done')) return true
    }
    if (!stack) return false
    return IsPreForge(stack, PreForgeTypeTearingSpear)
})
