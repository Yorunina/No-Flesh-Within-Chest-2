// priority: 1000
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