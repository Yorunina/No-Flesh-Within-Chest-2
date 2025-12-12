// priority: 500
const InfinityDimItem2DimId = {
    'minecraft:obsidian': 'infinity:cube',
    'minecraft:slime_ball': 'infinity:slime',
    'minecraft:grass_block': 'infinity:hills',
    'minecraft:dragon_breath': 'infinity:missingno',
    'minecraft:cherry_leaves': 'infinity:spiral',
    'minecraft:sponge': 'infinity:sponge',
    'minecraft:stick': 'infinity:content',
    'minecraft:stone': 'infinity:classic',
    'minecraft:bricks': 'infinity:isolation',
    'minecraft:black_concrete': 'infinity:chess',
    'minecraft:book': 'infinity:library',
    'minecraft:glowstone': 'infinity:nexus',
    'minecraft:redstone': 'infinity:perfection'
}
InfinityEvents.itemInPortal(event => {
    const itemEntity = event.getEntity()
    if (itemEntity.isOnPortalCooldown()) return
    /** @type {Internal.ItemStack} */
    const itemStack = itemEntity.getItem()
    itemEntity.setPortalCooldown(200)
    const level = event.getLevel()
    const pos = event.getPos()
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
        itemEntity.remove('changed_dimension')
        InfinityPortalCreator.tryCreatePortalById('kubejs:oath', level, pos)
    } else if (itemStack.is('exposure:photograph') && itemStack.hasNBT()) {
        let nbt = itemStack.getNbt()
        if (nbt.contains('PhotographerId')) {
            let phtographerId = nbt.getUUID('PhotographerId')
            let targetPlayer = level.getPlayerByUUID(phtographerId)
            if (!DimensionsNet.getNetFromPlayer(targetPlayer)) {
                DimensionsNet.createNewNetForPlayer(targetPlayer, 64, 27)
            }
        }
    } else if (itemStack.is('minecraft:diamond_block')) {
        itemEntity.setItem(Item.of('beyonddimensions:net_pathway'))
    } else {
        let dimId = InfinityDimItem2DimId[itemStack.getId().toString()]
        if (!dimId) return
        itemEntity.remove('changed_dimension')
        InfinityPortalCreator.tryCreatePortalById(dimId, level, pos)
    }
})





InfinityEvents.infinityDimAdded(event => {
    // todo
    const id = event.getId()
    const dim = event.getTargetDim()
    if (id.toString() == 'infinity:test1') {
        dim.structure_ids.put('ctov:medium/village_plains', ['infinity:medium_village_plains_-1149656568'])
    }
})