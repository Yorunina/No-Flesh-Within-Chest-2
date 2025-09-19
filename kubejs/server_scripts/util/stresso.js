// priority: 3000

/**
 * 
 * @param {Internal.ItemStack} item 
 * @param {Number} cur 
 */
function SetItemStresso(item, cur) {
    if (!item.hasNBT()) {
        item.setNbt(new $CompoundTag())
    }
    let nbt = item.getNbt()
    if (!nbt.contains('Stresso')) {
        nbt.putCompound('Stresso', new $CompoundTag())
    }
    let stressoNbt = nbt.getCompound('Stresso')
    stressoNbt.putInt('Cur', cur)
}

/**
 * 
 * @param {Internal.ItemStack} item 
 * @param {Number} max 
 */
function SetItemMaxStresso(item, max) {
    if (!item.hasNBT()) {
        item.setNbt(new $CompoundTag())
    }
    let nbt = item.getNbt()
    if (!nbt.contains('Stresso')) {
        nbt.putCompound('Stresso', new $CompoundTag())
    }
    let stressoNbt = nbt.getCompound('Stresso')
    stressoNbt.putInt('Max', max)
}

/**
 * 
 * @param {Internal.ItemStack} item 
 * @returns {Number}
 */
function GetItemStresso(item) {
    if (!item.hasNBT()) return 0
    let nbt = item.getNbt()
    if (!nbt.contains('Stresso')) return 0
    let stressoNbt = nbt.getCompound('Stresso')
    return stressoNbt.getInt('Cur')
}

/**
 * 
 * @param {Internal.ItemStack} item 
 * @returns {Number}
 */
function GetItemMaxStresso(item) {
    if (!item.hasNBT()) return 0
    let nbt = item.getNbt()
    if (!nbt.contains('Stresso')) return 0
    let stressoNbt = nbt.getCompound('Stresso')
    return stressoNbt.getInt('Max')
}



