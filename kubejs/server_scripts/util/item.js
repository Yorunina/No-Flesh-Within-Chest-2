// priority: 3000
/**
 * 
 * @param {Internal.CompoundTag} data 
 */
function DeserializeItemFromNbt(data) {
    let id = data.getString('id')
    let count = data.getInt('Count')
    let nbt = data.getCompound('tag')
    let res = Item.of(id, count)
    if (nbt) {
        res.setNbt(nbt)
    }
    return res
}