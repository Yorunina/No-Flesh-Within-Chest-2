// priority: 500
$CustomRequirement.registerCustomFunction('ancient_flamberge_blade', ctx => {
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
    let burnsEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:burns')
    if (burnsEfficiency < 20) return false
    let attackDamageAttributeValue = RoundFix(modularItem.getAttributeValue(stack, 'minecraft:generic.attack_damage', 1), 2)
    if (attackDamageAttributeValue < 12) return false
    return true
})