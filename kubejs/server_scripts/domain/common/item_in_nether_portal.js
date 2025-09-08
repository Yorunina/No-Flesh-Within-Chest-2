// priority: 500
InfinityEvents.itemInNetherPortal(event => {
    const itemEntity = event.getEntity()
    const itemStack = itemEntity.getItem()
    const level = event.getLevel()
    const pos = event.getPos()
    let nbt = itemStack.getNbt()

    if (itemStack.is('minecraft:gold_ingot')) {
        let isSucc = InfinityPortalCreator.modifyOnInitialCollision('infinity:gold_cave', level, pos)
        if (isSucc) itemEntity.remove('changed_dimension')
    } else if (itemStack.is('minecraft:diamond')) {
        let isSucc = InfinityPortalCreator.modifyOnInitialCollision('infinity:diamond_cave', level, pos)
        if (isSucc) itemEntity.remove('changed_dimension')
    }
})

InfinityEvents.infinityDimAdded(event => {

})