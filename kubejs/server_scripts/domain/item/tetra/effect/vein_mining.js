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
    const block = event.block
    const level = event.level

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

    const blockState = block.blockState
    if (!blockState.canHarvestBlock(level, block.pos, player)) return

    veinMiningLockMap.set(uuidStr, level.time)
    let minedBlockCount = 1

    try {
        /** @type {Set<string>} */
        let visitedBlockPosSet = new Set([getBlockPosKey(block.pos)])
        /**@type {VeinMiningBlockDepthModel[]} */
        let veinMiningList = []
        let nextTargetIndex = 0
        addValidNeighbors(veinMiningList, new VeinMiningBlockDepthModel(block.pos, 0), visitedBlockPosSet, maxVeinRange)

        while (nextTargetIndex < veinMiningList.length && minedBlockCount < maxBlockCount) {
            let veinMiningTarget = veinMiningList[nextTargetIndex++]
            let pPos = veinMiningTarget.pos
            let pBlockState = level.getBlockState(pPos)
            if (pBlockState.isAir()) continue
            if (!pBlockState.is(block.id)) continue
            if (!pBlockState.canHarvestBlock(level, pPos, player)) continue
            if (!player.gameMode.destroyBlock(pPos)) continue

            minedBlockCount++
            addValidNeighbors(veinMiningList, veinMiningTarget, visitedBlockPosSet, maxVeinRange)
        }
    } finally {
        veinMiningLockMap.delete(uuidStr)
    }

    player.addExhaustion(minedBlockCount * 0.1)
})

/**
 * 
 * @param {VeinMiningBlockDepthModel[]}  veinMiningList 
 * @param {VeinMiningBlockDepthModel}  veinMiningBlock 
 * @param {Set<string>} visitedBlockPosSet
 * @param {number} maxVeinRange
 */
function addValidNeighbors(veinMiningList, veinMiningBlock, visitedBlockPosSet, maxVeinRange) {
    let pos = veinMiningBlock.pos
    let newDepth = veinMiningBlock.depth + 1
    if (newDepth > maxVeinRange) return

    for (let offset of diagonalMiningOffsetList) {
        let neighborPos = pos.offset(offset[0], offset[1], offset[2])
        let neighborPosKey = getBlockPosKey(neighborPos)
        if (visitedBlockPosSet.has(neighborPosKey)) continue

        visitedBlockPosSet.add(neighborPosKey)
        veinMiningList.push(new VeinMiningBlockDepthModel(neighborPos, newDepth))
    }
}

/**
 * @param {BlockPos} pos
 * @returns {string}
 */
function getBlockPosKey(pos) {
    return `${pos.getX()},${pos.getY()},${pos.getZ()}`
}
