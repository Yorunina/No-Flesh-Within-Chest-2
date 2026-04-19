// priority: 500
RegistryOrgan('kubejs:scry_stomach_pouch')
    .addScore('chestcavity:nutrition', 1)
    .addScore('kubejs:magic_capacity', 2)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ScryStomachPouchKeyActiveOnly(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    let renderList = []
    /** @type {Internal.ItemStack[]} */
    let revealBlockItemList = []
    let contentsItem = GetBundleContents(organItem)
    for (let pItem of contentsItem) {
        if (pItem.isEmpty() || !pItem.isBlock()) continue
        revealBlockItemList.push(pItem)
    }
    if (revealBlockItemList.length <= 0) return
    for (let pBlockPos of BlockPos.withinManhattan(player.blockPosition(), 16, 32, 16)) {
        if (level.isOutsideBuildHeight(pBlockPos)) continue
        let blockState = level.getBlockState(pBlockPos)
        if (blockState.isAir()) continue
        if (renderList.length >= 50) break
        let blockItem = level.getBlock(pBlockPos).getItem()
        for (let pItem of revealBlockItemList) {
            if (pItem.is(blockItem)) {
                renderList.push(new OutlineRenderModel(pBlockPos, 0xf50000).setTime(level.time + 20 * 60))
                break
            }
        }
    }
    HighlightBlockPos(player, renderList)
    player.addItemCooldown(organItem, 20 * 60)
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:scry_stomach_pouch')
        .addOnlyStrategy('key_active', ScryStomachPouchKeyActiveOnly)
)