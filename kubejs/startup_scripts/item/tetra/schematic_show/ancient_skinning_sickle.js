// priority: 500

TetraCustomRequirement.register('ancient_skinning_sickle', /** @param {Internal.CraftingContext} ctx */ ctx => {
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
    let skinningEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:skinning')
    if (skinningEfficiency < 60) return false
    return true
})
