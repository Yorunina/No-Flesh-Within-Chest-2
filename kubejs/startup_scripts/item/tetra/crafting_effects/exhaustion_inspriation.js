// priority: 500
$CustomRequirement.registerCustomCEFunction('exhaustion_inspiration', ctx => {
    const level = ctx.world()
    const player = ctx.player()
    if (level.isClientSide()) return false
    let foodData = player.getFoodData()
    if (foodData.getSaturationLevel() <= 15) return false
    foodData.addExhaustion(40)
    return true
})