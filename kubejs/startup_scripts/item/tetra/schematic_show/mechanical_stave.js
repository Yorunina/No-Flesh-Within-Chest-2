// priority: 500
$CustomRequirement.registerCustomFunction('mechanical_stave', ctx => {
    const player = ctx.player
    const level = ctx.world
    const stack = ctx.targetStack
    
    if (!level || level.isClientSide()) {
        if (AStagesClient.getServerAndPlayerClientStages().contains('ftb_genesis_process_done')) return true
    } else {
        if (AStages.serverAndPlayerHasStage(player, 'ftb_genesis_process_done')) return true
    }
    if (!IsPreForge(stack, PreForgeTypeMechanicalSaw)) return false
    return true
})