// priority: 500
$CustomRequirement.registerCustomFunction('ancient_gula_scythe', ctx => {
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
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let devourBloodEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:devour_blood')
    if (devourBloodEfficiency < 8) return false
    let attackSpeedAttributeValue = RoundFix(modularItem.getAttributeValue(stack, 'generic.attack_speed'), 2)
    if (attackSpeedAttributeValue < -3) return false
    return true
})