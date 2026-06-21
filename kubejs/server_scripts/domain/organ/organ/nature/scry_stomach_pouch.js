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
    /** @type {string[]} */
    let revealBlockList = []
    let contentsItem = GetBundleContents(organItem)
    for (let pItemStack of contentsItem) {
        if (pItemStack.isEmpty()) continue
        let pItem = pItemStack.getItem()
        if (!(pItem instanceof $BlockItem)) continue
        let pBlock = pItem.getBlock()
        if (pBlock.id == 'minecraft:chest') revealBlockList.push('lootr:lootr_chest')
        if (pBlock.id == 'minecraft:barrel') revealBlockList.push('lootr:lootr_barrel')
        revealBlockList.push(pBlock.id)
    }
    if (revealBlockList.length <= 0) return
    for (let pBlockPos of BlockPos.withinManhattan(player.blockPosition(), 16, 32, 16)) {
        if (level.isOutsideBuildHeight(pBlockPos)) continue
        let blockState = level.getBlockState(pBlockPos)
        if (blockState.isAir()) continue
        if (renderList.length >= 50) break
        let block = blockState.getBlock()
        for (let pBlock of revealBlockList) {
            if (pBlock == block.id) {
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