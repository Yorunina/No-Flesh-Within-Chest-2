// priority: 500
BlockEvents.rightClicked('infinity:nether_portal', event => {
    const item = event.getItem()
    if (!item.is('kubejs:key_to_infinity')) return
    const block = event.getBlock()
    const level = event.getLevel()
    const pos = block.getPos()
    let entity = level.getBlockEntity(pos)
    /**@type {ResourceLocation} */
    let dimStr = entity.getDimension()
    item.setHoverName(dimStr.getPath())
})