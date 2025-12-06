// priority: 500
InfinityEvents.itemInPortal(event => {
    const itemEntity = event.getEntity()
    const itemStack = itemEntity.getItem()
    const level = event.getLevel()
    const pos = event.getPos()
    console.log(itemStack)
    if (itemStack.is('kubejs:key_to_infinity')) {
        let nameString = 'infinity:random'
        if (itemStack.hasCustomHoverName()) {
            nameString = itemStack.getHoverName().getString()
        }
        if (!nameString.startsWith('infinity:')) {
            nameString = 'infinity:'.concat(nameString.trim())
        }
        itemEntity.remove('changed_dimension')
        InfinityPortalCreator.tryCreatePortalById(nameString, level, pos)
    } else if (itemStack.hasTag('lightmanscurrency:coins')) {
        InfinityPortalCreator.tryCreatePortalById('kubejs:oath', level, pos)
    }
})


InfinityEvents.infinityDimAdded(event => {
    const id = event.getId()
    const dim = event.getTargetDim()
    console.log(id.toString())
    if (id.toString() == 'infinity:test1') {
        dim.structure_ids.put('ctov:medium/village_plains', ['infinity:medium_village_plains_-1149656568'])
    }
})