// priority: 3000
/**
 * 
 * @param {Internal.CompoundTag} data 
 */
function DeserializeItemFromNbt(data) {
    let id = data.getString('id')
    let count = data.getInt('Count')
    let nbt = data.getCompound('tag')
    if (!id) {
        return null
    }
    let res = Item.of(id, count)
    if (nbt) {
        res.setNbt(nbt)
    }
    return res
}

function GetTreaseMapItem(level, pos) {
    let mapItem = $MapItem.create(level, pos.x, pos.z, 1, true, true)
    $MapItem.renderBiomePreviewMap(level, mapItem)
    $MapItemSavedData.addTargetDecoration(mapItem, pos, "+", $MapDecorationType.RED_X)
    return mapItem
}

// todo
// let placementState = Block.getBlock('minecraft:chest').defaultBlockState()
// level.setBlock(pos, placementState, 2)
// $RandomizableContainerBlockEntity.setLootTable(level, level.getRandom(), pos, table)