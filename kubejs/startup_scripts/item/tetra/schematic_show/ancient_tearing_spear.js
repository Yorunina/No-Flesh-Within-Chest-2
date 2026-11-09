// priority: 500

TetraCustomRequirement.register('ancient_tearing_spear', /** @param {Internal.CraftingContext} ctx */ ctx => {
    const player = ctx.player
    const level = ctx.world
    const stack = ctx.targetStack

    if (!level || level.isClientSide()) {
        if (AStagesClient.serverAndPlayerHasStage('ftb_genesis_process_done')) return true
    } else {
        if (AStages.serverAndPlayerHasStage(player, 'ftb_genesis_process_done')) return true
    }
    /**@type {Internal.ModularItem} */
    const modularItem = stack.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return false
    let severingLevel = modularItem.getEffectLevel(stack, 'severing')
    if (severingLevel < 50) return false
    return true
})
