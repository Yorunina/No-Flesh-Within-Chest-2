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
    const chestCavity = player.chestCavityInstance
    const hasRockyKidney = GetCustomDataMap(chestCavity, 'hasRockyKidney', 0) != 0
    let renderList = []
    let processedCount = 0
    /** @type {string[]} */
    let revealBlockList = []
    let dropItemList = []
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
        if (processedCount >= 64) break
        let block = blockState.getBlock()
        for (let pBlock of revealBlockList) {
            if (pBlock != block.id) continue
            renderList.push(new OutlineRenderModel(pBlockPos, 0xf50000).setTime(level.time + 20 * 60))
            processedCount++
            if (!hasRockyKidney) break
            // 破坏强化
            if (block.id == 'lootr:lootr_chest' || block.id == 'lootr:lootr_barrel') {
                /**@type {Internal.LootrChestBlockEntity} */
                let blockEntity = level.getBlockEntity(pBlockPos)
                if (blockEntity.getOpeners().contains(player.uuid)) break
                dropItemList = dropItemList.concat(Utils.rollChestLoot(blockEntity.getTable(), player))
            }

            let lootContext = new $LootParamsBuilder(level)
                .withParameter($LootContextParams.ORIGIN, new Vec3d(pBlockPos.getX(), pBlockPos.getY(), pBlockPos.getZ()))
                .withParameter($LootContextParams.BLOCK_STATE, blockState)
                .withParameter($LootContextParams.THIS_ENTITY, player)
                .withParameter($LootContextParams.TOOL, player.getMainHandItem())
            dropItemList = dropItemList.concat(blockState.getDrops(lootContext))
            level.destroyBlock(pBlockPos, false, player)
            break
        }
    }
    if (dropItemList.length > 0) {
        SpawnLootAtLocation(level, player.blockPosition(), dropItemList)
    }
    ClearHighlightPos(player)
    HighlightBlockPos(player, renderList)

    player.addItemCooldown(organItem, 20 * 3)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:scry_stomach_pouch')
        .addOnlyStrategy('key_active', ScryStomachPouchKeyActiveOnly)
)