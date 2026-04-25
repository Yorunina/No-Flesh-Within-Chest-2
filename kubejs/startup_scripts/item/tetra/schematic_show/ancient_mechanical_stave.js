// priority: 500
$CustomRequirement.registerCustomFunction('ancient_mechanical_stave', ctx => {
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
    let seekingArrowEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:seeking_arrow')
    if (seekingArrowEfficiency < 14) return false
    let drawSpeedAttributeValue = RoundFix(modularItem.getAttributeValue(stack, 'tetra:draw_speed'), 2)
    if (drawSpeedAttributeValue > 1.6) return false
    return true
})