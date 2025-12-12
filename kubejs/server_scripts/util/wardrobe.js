// priority: 3000
/**
 * 判断是否在对应槽位已经有皮肤了
 * @param {Internal.Entity} entity 
 * @param {string} type 
 * @returns {boolean}
 */
function HadSetAnyWardrobeSkin(entity, type) {
    let wardrobe = entity.getWardrobe()
    return wardrobe.getFreeSize(type) < wardrobe.getMaximumSize(type)
}


/**
 * 判断是否在对应槽位已经有皮肤了
 * @param {Internal.Entity} entity 
 * @param {string} type 
 * @param {string} skin 
 * @returns {boolean}
 */
function AddSkinToSlot(entity, type, skin) {
    let wardrobe = entity.getWardrobe()
    console.log(wardrobe.getFreeSize(type))
    for (let i = 0; i < wardrobe.getUnlockedSize(type); i++) {
        let curItem = wardrobe.getItem(type, i)
        if (!curItem || curItem.isEmpty()) {
            let skinItem = Item.of('armourers_workshop:skin')
            wardrobe.loadSkin(skin).addTo(skinItem)
            wardrobe.setItem(type, i, skinItem)
            wardrobe.broadcast()
            return true
        }
    }
    return false
}

/**
 * 
 * @param {Internal.Entity} entity 
 * @param {string} type 
 * @param {string} skin 
 * @returns 
 */
function RemoveSkinFromSlot(entity, type, skin) {
    let wardrobe = entity.getWardrobe()
    for (let i = 0; i < wardrobe.getUnlockedSize(type); i++) {
        let curItem = wardrobe.getItem(type, i)
        if (curItem && wardrobe.loadSkinByItem(curItem).getIdentifier() == skin) {
            wardrobe.setItem(type, i, Item.empty)
            wardrobe.broadcast()
            return true
        }
    }
    return false
}


