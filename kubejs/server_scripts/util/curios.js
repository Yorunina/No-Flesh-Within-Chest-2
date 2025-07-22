// priority: 3000

/**
 * 获取 player curios inventory cap
 * @param {Internal.ServerPlayer} player 
 * @returns {Internal.ICuriosItemHandler}
 */
function GetPlayerCuriosInventoryCap(player) {
    let curiosCap = player.getCapability(CuriosCapabilities.INVENTORY)
    if (curiosCap.isPresent()) {
        return curiosCap.resolve().get()
    }
    return null
}

/**
 * 获取 player curios item cap
 * @param {Internal.ServerPlayer} player 
 * @returns {Internal.ICurio}
 */
function GetPlayerCuriosItemCap(player) {
    let curiosCap = player.getCapability(CuriosCapabilities.ITEM)
    if (curiosCap.isPresent()) {
        return curiosCap.resolve().get()
    }
    return null
}