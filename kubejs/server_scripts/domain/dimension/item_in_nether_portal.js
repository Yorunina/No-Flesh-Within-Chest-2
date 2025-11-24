// priority: 500
InfinityEvents.itemInNetherPortal(event => {
    const itemEntity = event.getEntity()
    const itemStack = itemEntity.getItem()
    const level = event.getLevel()
    const pos = event.getPos()

    if (itemStack.is('kubejs:key_to_infinity')) {
        let itemName = itemStack.getHoverName()
        let nameString = itemName.getString()
        if (!nameString.startsWith('infinity:')) {
            nameString = 'infinity:'.concat(nameString.trim())
        }
        let isSucc = InfinityPortalCreator.modifyOnInitialCollision(nameString, level, pos)
        if (isSucc) itemEntity.remove('changed_dimension')
    } else if (itemStack.hasTag('lightmanscurrency:coins')) {
        InfinityPortalCreator.modifyOnInitialCollision('kubejs:oath', level, pos)
    }
})


InfinityEvents.infinityDimAdded(event => {

})