// priority: 500
BlockEvents.broken(event => {
    const player = event.player
    const block = event.block
    const level = event.level
    if (!player || level.isClientSide()) return
    if (!player.isCrouching()) return

    let heldItem = player.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return

    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:block_scry')
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:block_scry')
    if (effectLevel <= 0 && effectEfficiency <= 0) return
    if (!TetraWearHelper.canUseEnergy(player)) return
    if (TetraWearHelper.getCurrent(player) < 1) return

    let radius = Math.max(2, 2 + 2 * Math.max(0, effectLevel))
    let maxBlockCount = Math.max(8, Math.floor(8 + 4 * Math.max(0, effectEfficiency)))
    let targetBlockId = block.id
    let renderList = []
    let processedCount = 0
    let origin = block.pos

    for (let pBlockPos of BlockPos.withinManhattan(origin, radius, radius, radius)) {
        if (pBlockPos.equals(origin)) continue
        if (level.isOutsideBuildHeight(pBlockPos)) continue
        let blockState = level.getBlockState(pBlockPos)
        if (blockState.isAir()) continue
        if (blockState.getBlock().id != targetBlockId) continue
        renderList.push(new OutlineRenderModel(pBlockPos, '0x9f00bb').setTime(level.time + 1200))
        processedCount++
        if (processedCount >= maxBlockCount) break
    }
    if (processedCount <= 0) return

    TetraWearHelper.drain(player, 1)
    ClearHighlightPos(player)
    if (renderList.length > 0) {
        HighlightBlockPos(player, renderList)
    }
})
