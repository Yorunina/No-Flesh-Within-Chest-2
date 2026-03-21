// priority: 500
$CustomRequirement.registerCustomFunction('genesis_integrity_process', ctx => {
    const player = ctx.player
    const level = ctx.world
    
    if (!level || level.isClientSide()) {
        let stages = AStagesClient.getServerAndPlayerClientStages()
        if (stages.contains('ftb_genesis_process_done') && stages.contains('ftb_genesis_integrity_process')) return true
    } else {
        if (AStages.serverAndPlayerHasStage(player, 'ftb_genesis_process_done') && AStages.serverAndPlayerHasStage(player, 'ftb_genesis_integrity_process')) return true
    }
    return false
})

