// priority: 500
const veinMiningLockMap = new Map()
const diagonalMiningOffsetList = [[0, 1, 0], [0, -1, 0],
[-1, 1, 0], [1, 1, 0], [0, 1, 1], [0, 1, -1], [-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1],
[-1, -1, 0], [1, -1, 0], [0, -1, 1], [0, -1, -1], [-1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, -1, -1],
[-1, 0, 0], [1, 0, 0], [0, 0, 1], [0, 0, -1], [-1, 0, -1], [-1, 0, 1], [1, 0, 1], [1, 0, -1]]
/**
 * @param {BlockPos} pos 
 * @param {number} depth 
 * @returns 
 */
function VeinMiningBlockDepthModel(pos, depth) {
    this.pos = pos
    this.depth = depth
    return this
}

ItemEvents.rightClicked(event => {
    const stack = event.item
    /**@type {Internal.ModularItem} */
    const item = stack.getItem()
    const player = event.player
    if (!TetraJSUtils.isModularItem(item)) return
    let effectLevel = item.getEffectLevel(stack, 'kubejs:vein_mining')
    let effectEfficiency = item.getEffectEfficiency(stack, 'kubejs:vein_mining')
    if (effectLevel <= 0 || effectEfficiency <= 0) return
    const nbt = stack.getOrCreateTag()
    nbt.putBoolean('canVeinMining', nbt.contains('canVeinMining') ? !nbt.getBoolean('canVeinMining') : false)
    if (player) player.setStatusMessage(nbt.getBoolean('canVeinMining') ?
        Text.translate('status_msg.kubejs.vein_mining_status.enabled') :
        Text.translate('status_msg.kubejs.vein_mining_status.disabled'))
})


BlockEvents.broken(event => {
    const player = event.player
    if (!player) return
    if (player.isCrouching()) return
    let uuidStr = String(player.UUID)
    if (veinMiningLockMap.has(uuidStr) && level.time - veinMiningLockMap.get(uuidStr) < 100) return

    let heldItem = player.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    const nbt = heldItem.getOrCreateTag()
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:vein_mining')
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:vein_mining')
    if (effectLevel <= 0 || effectEfficiency <= 0) return
    if (nbt.contains('canVeinMining') && !nbt.getBoolean('canVeinMining')) return
    let maxBlockCount = effectEfficiency * 5 + 20
    let maxVeinRange = effectLevel + 5
    const block = event.block
    const level = event.level
    const blockState = block.blockState
    if (!blockState.canHarvestBlock(level, block.pos, player)) return

    veinMiningLockMap.set(uuidStr, level.time)
    /**@type {VeinMiningBlockDepthModel[]} */
    let veinMiningList = []
    addValidNeighbors(veinMiningList, new VeinMiningBlockDepthModel(block.pos, 0))
    let minedBlockCount = 1
    while (veinMiningList.length > 0 && minedBlockCount < maxBlockCount) {
        let veinMiningTarget = veinMiningList.shift()
        let pPos = veinMiningTarget.pos
        let pBlockState = level.getBlockState(pPos)
        if (pBlockState.is(block) && pBlockState.canHarvestBlock(level, pPos, player)) {
            heldItem.mineBlock(level, pBlockState, pPos, player)
            let pEntity = level.getBlockEntity(pPos)
            pBlockState.block.playerDestroy(level, player, pPos, pBlockState, pEntity, heldItem)
            pBlockState.onDestroyedByPlayer(level, pPos, player, true, level.getFluidState(pPos))
            minedBlockCount++
            if (veinMiningTarget.depth < maxVeinRange) {
                addValidNeighbors(veinMiningList, new VeinMiningBlockDepthModel(pPos, 0))
            }
        }
    }
    player.addExhaustion(minedBlockCount * 0.1)
    veinMiningLockMap.delete(uuidStr)
})

/**
 * 
 * @param {VeinMiningBlockDepthModel[]}  veinMiningList 
 * @param {VeinMiningBlockDepthModel}  veinMiningBlock 
 */
function addValidNeighbors(veinMiningList, veinMiningBlock) {
    let pos = veinMiningBlock.pos
    let newDepth = veinMiningBlock.depth + 1
    for (let offset of diagonalMiningOffsetList) {
        veinMiningList.push(new VeinMiningBlockDepthModel(pos.offset(offset[0], offset[1], offset[2]), newDepth))
    }
}