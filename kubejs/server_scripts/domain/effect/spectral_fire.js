// priority: 800
EntityEvents.death(event => {
    const entity = event.entity
    if (!entity.hasEffect('kubejs:spectral_fire')) return
    const level = event.level
    const effect = entity.getEffect('kubejs:spectral_fire')
    let lvl = effect.getAmplifier()
    let duration = effect.getDuration()
    let entityList = GetLivingWithinRadius(level, entity.blockPosition(), 16, (pLevel, pEntity) => {
        if (pEntity.isPlayer()) return false
        if (pEntity.hasEffect('kubejs:spectral_fire')) return false
        return true
    })
    for (let i = 0; i < lvl + 1; i++) {
        entityList[i].potionEffects.add('kubejs:spectral_fire', duration, lvl + 1, true, true)
    }
})
