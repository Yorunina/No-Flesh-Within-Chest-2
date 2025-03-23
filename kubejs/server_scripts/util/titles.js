// priority: 3000

/**
 * 为某个玩家解锁某个头衔
 * @param {Internal.ServerPlayer} player 
 * @param {ResourceLocation} titleKey
 */
function UnlockPlayerTitle(player, titleKey) {
    $TitleManager.unlockTitle(player, titleKey)
}


/**
 * 根据id获取玩家的头衔
 * @param {String} id 
 */
function GetPlayerTitle(id) {
    return $TitleManager.getTitle(id)
}