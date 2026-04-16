
// priority: 500
RegistryOrgan('kubejs:remnant_heart')
    .addScore('chestcavity:detoxification', 1)
    .addScore('chestcavity:fire_resistant', 1)
    .setCanSpawn(true)


/**
 * @param {OrganBlockRightClickedStrategyCustomData} customData
 * @param {Internal.BlockRightClickedEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RemnantHeartBlockRightClicked(customData, event, organItem, organIndex, slotType) {
    const block = event.block
    const level = event.level
    if (event.hand != 'main_hand') return
    let blockPos = block.getPos()
    if (block.id != 'minecraft:sand' && block.id != 'minecraft:gravel') return
    let itemAbove = GetItemEntityWithinRadius(level, blockPos.above(), 1, (level, entity) => true)
    if (itemAbove.length <= 0) return
    /**@type {Internal.ItemEntity} */
    let itemHiden = RandomGet(itemAbove)
    let item = itemHiden.getItem()
    itemHiden.discard()
    let nbt = new $CompoundTag()
    nbt.put('item', item.serializeNBT())
    switch (block.id) {
        case 'minecraft:sand':
            level.setBlockAndUpdate(blockPos, Blocks.SUSPICIOUS_SAND.defaultBlockState())
            let sandEntity = level.getBlockEntity(blockPos)
            sandEntity.deserializeNBT(nbt)
            level.setBlockEntity(sandEntity)
            break
        case 'minecraft:gravel':
            level.setBlockAndUpdate(blockPos, Blocks.SUSPICIOUS_GRAVEL.defaultBlockState())
            let gravelEntity = level.getBlockEntity(blockPos)
            gravelEntity.deserializeNBT(nbt)
            level.setBlockEntity(gravelEntity)
            break
    }

}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:remnant_heart')
        .addOnlyStrategy('block_right_clicked', RemnantHeartBlockRightClicked)
)