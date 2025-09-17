// priority: 3000

/**
 * 获取 entity curios inventory cap
 * @param {Internal.Entity} entity 
 * @returns {Internal.ICuriosItemHandler}
 */
function GetCuriosInventoryCap(entity) {
    let curiosCap = entity.getCapability(CuriosCapabilities.INVENTORY)
    if (curiosCap.isPresent()) {
        return curiosCap.resolve().get()
    }
    return null
}

/**
 * 获取 entity curios item cap
 * @param {Internal.Entity} entity 
 * @returns {Internal.ICurio}
 */
function GetCuriosItemCap(entity) {
    let curiosCap = entity.getCapability(CuriosCapabilities.ITEM)
    if (curiosCap.isPresent()) {
        return curiosCap.resolve().get()
    }
    return null
}