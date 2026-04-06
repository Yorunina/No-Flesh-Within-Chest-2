// priority: 500
EntityEvents.death(event => {
    const killer = event.source.actual
    if (!killer || !killer.isPlayer()) return
    const entity = event.entity
    if (entity.getTicksFrozen() < 140) return
    let curiosItemHandler = GetCuriosInventoryCap(killer)
    let miracleStackOpt = curiosItemHandler.getStacksHandler('miracle')
    if (!miracleStackOpt.isPresent()) return
    let miracleStackHandler = miracleStackOpt.get()
    let miraclelStacks = miracleStackHandler.getStacks()
    if (miraclelStacks.getSlots() <= 0) return
    miraclelStacks.allItems.forEach(pItem => {
        if (!pItem.is('kubejs:eternal_miracle')) return
        let nbt = pItem.getOrCreateTag()
        nbt.putInt('value', nbt.getInt('value') + 1)
        pItem.setNbt(nbt)
    })
})

EntityEvents.death(event => {
    const killer = event.source.actual
    if (!killer || !killer.isPlayer()) return
    const entity = event.entity
    if (entity.getRemainingFireTicks() < 600) return
    let curiosItemHandler = GetCuriosInventoryCap(killer)
    let miracleStackOpt = curiosItemHandler.getStacksHandler('miracle')
    if (!miracleStackOpt.isPresent()) return
    let miracleStackHandler = miracleStackOpt.get()
    let miraclelStacks = miracleStackHandler.getStacks()
    if (miraclelStacks.getSlots() <= 0) return
    miraclelStacks.allItems.forEach(pItem => {
        if (!pItem.is('kubejs:incandescent_miracle')) return
        let nbt = pItem.getOrCreateTag()
        nbt.putInt('value', nbt.getInt('value') + 1)
        pItem.setNbt(nbt)
    })
})