// priority: 3000
/**
 * BlockPos列表转换为ListTag
 * @param {BlockPos[]} posList 
 * @returns {Internal.ListTag}
 */
function ConvertPosList2Nbt(posList) {
    let res = new $ListTag()
    posList.forEach(/** @param {BlockPos} pos */pos => {
        let nbt = new $CompoundTag()
        nbt.putInt('x', pos.getX())
        nbt.putInt('y', pos.getY())
        nbt.putInt('z', pos.getZ())
        res.add(nbt)
    })
    return res
}

/**
 * BlockPos转换为Tag
 * @param {BlockPos} pos
 * @returns {Internal.CompoundTag}
 */
function ConvertPos2Nbt(pos) {
    let nbt = new $CompoundTag()
    nbt.putInt('x', pos.getX())
    nbt.putInt('y', pos.getY())
    nbt.putInt('z', pos.getZ())
    return nbt
}

/**
 * ListTag转换为BlockPos
 * @param {Internal.ListTag} nbtList 
 * @returns {BlockPos[]}
 */
function ConvertNbt2PosList(nbtList) {
    let posList = []
    nbtList.forEach(/** @param {Internal.CompoundTag} nbt */nbt => {
        if (!nbt || !nbt.contains('x') || !nbt.contains('y') || !nbt.contains('z')) return null
        let pos = new BlockPos(nbt.getInt('x'), nbt.getInt('y'), nbt.getInt('z'))
        posList.push(pos)
    })
    return posList
}

/**
 * Tag转换为BlockPos
 * @param {Internal.CompoundTag} nbt
 * @returns {BlockPos}
 */
function ConvertNbt2Pos(nbt) {
    if (!nbt || !nbt.contains('x') || !nbt.contains('y') || !nbt.contains('z')) return null
    let pos = new BlockPos(nbt.getInt('x'), nbt.getInt('y'), nbt.getInt('z'))
    return pos
}


/**
 * 转换ItemStack为NBT
 * @param {Internal.ItemStack} item 
 * @returns 
 */
function ConverItemStack2NBT(item) {
    let nbt = new $CompoundTag()
    nbt.putString('id', item.id)
    nbt.putInt('count', item.count)
    if (item.hasNBT()) {
        nbt.put('nbt', item.nbt)
    }
    return nbt
}


/**
 * 转换ItemStackList为ListTag
 * @param {Internal.ItemStack[]} items 
 * @returns {Internal.ListTag}
 */
function ConvertItemStackList2NBT(items) {
    let nbtList = new $ListTag()
    items.forEach(/** @param {Internal.ItemStack} item */item => {
        nbtList.add(ConverItemStack2NBT(item))
    })
    return nbtList
}


/**
 * 转换ListTag为ItemStackList
 * @param {Internal.ListTag} nbtList 
 * @returns {Internal.ItemStack[]}
 */
function ConvertNBT2ItemStackList(nbtList) {
    let items = []
    nbtList.forEach(/** @param {Internal.CompoundTag} nbt */nbt => {
        let item = Item.of(nbt.getString('id'))
        item.setCount(nbt.getInt('count'))
        if (nbt.contains('nbt')) {
            item.setNbt(nbt.get('nbt'))
        }
        items.push(item)
    })
    return items
}
