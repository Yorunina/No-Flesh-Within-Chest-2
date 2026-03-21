// priority: 500
$CustomRequirement.registerCustomFunction('genesis_process_done', ctx => {
    const player = ctx.player
    const level = ctx.world
    if (!level || level.isClientSide()) {
        if (AStagesClient.getServerAndPlayerClientStages().contains('ftb_genesis_process_done')) return true
    } else {
        if (AStages.serverAndPlayerHasStage(player, 'ftb_genesis_process_done')) return true
    }
    return false
})