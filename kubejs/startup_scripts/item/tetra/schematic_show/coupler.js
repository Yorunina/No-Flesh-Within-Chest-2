// priority: 500
$CustomRequirement.registerCustomFunction('coupler', ctx => {
    const player = ctx.player
    const level = ctx.world
    const stack = ctx.targetStack
    
    if (!level || level.isClientSide()) {
        if (AStagesClient.getServerAndPlayerClientStages().contains('ftb_genesis_process_done')) return true
    } else {
        if (AStages.serverAndPlayerHasStage(player, 'ftb_genesis_process_done')) return true
    }
    /**@type {Internal.ModularItem} */
    const modularItem = stack.getItem()
    let maxDamage = modularItem.getMaxDamage(stack)
    if (maxDamage < 2000) return false
    let mineSpeed = GetModularItemMineSpeed(stack)
    if (mineSpeed < 9) return false
    return true
})