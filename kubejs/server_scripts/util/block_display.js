// priority: 950
const NET_HIGHLIGHT_POS = 'highlight_pos'
/**
 * 展示方块的边框线
 * @param {Internal.ServerPlayer} player 
 * @param {OutlineRenderModel[]} outlineList 
 */
function HighlightBlockPos(player, outlineList) {
    let netNbt = new $CompoundTag()
    netNbt.put('highlightList', ConvertOutlineRenderList2Nbt(outlineList))
    netNbt.putInt('mode', 0)
    player.sendData(NET_HIGHLIGHT_POS, netNbt)
}

/**
 * 清除当前所有在显示的边框线
 * @param {Internal.ServerPlayer} player 
 */
function ClearHighlightPos(player) {
    let netNbt = new $CompoundTag()
    netNbt.putInt('mode', 1)
    player.sendData(NET_HIGHLIGHT_POS, netNbt)
}

/**
 * 删除某个位置的边框线展示
 * @param {Internal.ServerPlayer} player 
 * @param {OutlineRenderModel[]} outlineList
 */
function RemoveHighlightPos(player, outlineList) {
    let netNbt = new $CompoundTag()
    netNbt.putInt('mode', 2)
    netNbt.put('highlightList', ConvertOutlineRenderList2Nbt(outlineList))
    player.sendData(NET_HIGHLIGHT_POS, netNbt)
}
