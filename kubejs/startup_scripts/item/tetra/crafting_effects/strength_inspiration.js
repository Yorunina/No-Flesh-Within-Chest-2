// priority: 500
$CustomRequirement.registerCustomCEFunction('strength_inspiration', ctx => {
    const player = ctx.player()
    const level = ctx.world()
    if (level.isClientSide()) return false
    let chestCavityInstance = player.getChestCavityInstance()
    if (!chestCavityInstance) return false
    if (chestCavityInstance.getOrganScoreOrDefault('chestcavity:strength', 0) >= 15) return true 
    return false
})