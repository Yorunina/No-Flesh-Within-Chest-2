// priority: 500
$CustomRequirement.registerCustomFunction('dimension_probe', ctx => {
    const player = ctx.player
    const level = ctx.world
    
    if (!level || level.isClientSide()) {
        if (AStagesClient.getServerAndPlayerClientStages().contains('ftb_dimension_probe_craft_allow')) return true
    } else {
        if (AStages.serverAndPlayerHasStage(player, 'ftb_dimension_probe_craft_allow')) return true
    }
    return false
})