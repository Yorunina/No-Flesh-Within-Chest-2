// priority: 500
EntityEvents.death(event => {
    const killer = event.source.actual
    if (!killer || !killer.isPlayer()) return
    const entity = event.entity
    if (entity.getTicksFrozen() < 140) return
    IncrMiracleCuriosCounter(killer, 'kubejs:eternal_miracle')
})

EntityEvents.death(event => {
    const killer = event.source.actual
    if (!killer || !killer.isPlayer()) return
    const entity = event.entity
    if (entity.getRemainingFireTicks() < 600) return
    IncrMiracleCuriosCounter(killer, 'kubejs:incandescent_miracle')
})