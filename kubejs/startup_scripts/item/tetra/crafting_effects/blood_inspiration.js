// priority: 500
TetraCustomCraftingEffectCondition.register('blood_inspiration', ctx => {
    const level = ctx.world()
    const pos = ctx.pos()
    if (level.isClientSide()) return false

    let villagers = GetEntityWithinRadius(level, pos, 8, (pLevel, pEntity) => {
        return pEntity.type == 'minecraft:villager'
    })
    if (villagers.length >= 1) {
        villagers[0].kill()
        return true
    }
    return false
})