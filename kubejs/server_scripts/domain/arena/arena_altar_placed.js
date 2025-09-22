// priority: 500

BlockEvents.rightClicked('minecraft:crying_obsidian', event => {
    const item = event.getItem()
    const block = event.getBlock()
    /**@type {Internal.ServerLevel} */
    const level = event.getLevel()
    const player = event.getPlayer()

    if (event.getHand().equals($InteractionHand.OFF_HAND)) return
    if (!item.is('kubejs:amethyst_core')) return

    let belowBlock = block.offset(0, -1, 0)
    switch (belowBlock.id) {
        case 'graveyard:dark_iron_block': {
            placeAltarAndSetArena(level, player, block.getPos(), GraveyardBasicArenaPattern, 'basic_graveyard') ||
                placeAltarAndSetArena(level, player, block.getPos(), GraveyardAdvanceArenaPattern, 'advance_graveyard')
            break
        }
        case 'minecraft:respawn_anchor': {
            placeAltarAndSetArena(level, player, block.getPos(), NetherBasicArenaPattern, 'basic_nether') ||
                placeAltarAndSetArena(level, player, block.getPos(), NetherAdvanceArenaPattern, 'advance_nether')
            break
        }
        case 'minecraft:emerald_block': {
            placeAltarAndSetArena(level, player, block.getPos(), PillagerBasicArenaPattern, 'basic_pillager') ||
                placeAltarAndSetArena(level, player, block.getPos(), PillagerAdvanceArenaPattern, 'advance_pillager')
            break
        }
        case 'create:experience_block': {
            placeAltarAndSetArena(level, player, block.getPos(), SecretArenaPattern, 'secret')
            break
        }
    }
})

/**
 * @param {Internal.ServerLevel} level
 * @param {Internal.ServerPlayer} player
 * @param {BlockPos} blockPos
 * @param {Internal.BlockPattern} pattern
 * @param {string} arenaType
 * @returns {boolean} 是否成功放置祭坛
 */
function placeAltarAndSetArena(level, player, blockPos, pattern, arenaType) {
    let altarBlock = Block.getBlock('skyarena:altar_battle').defaultBlockState()
    let altarTopBlock = Block.getBlock('skyarena:altar_battle_top').defaultBlockState()

    altarBlock = altarBlock.setValue(BlockProperties.HORIZONTAL_FACING, player.getHorizontalFacing().getOpposite())
    altarTopBlock = altarTopBlock.setValue(BlockProperties.HORIZONTAL_FACING, player.getHorizontalFacing().getOpposite())

    let matchRes = matchPossibleArena(level, blockPos, pattern)
    if (!matchRes) return false
    level.setBlockAndUpdate(blockPos, altarBlock)
    level.setBlockAndUpdate(blockPos.offset(0, 1, 0), altarTopBlock)

    /**@type {Internal.AltarBlockEntity} */
    let altarEntity = level.getBlockEntity(blockPos)
    altarEntity.switchToTargetArena(arenaType)
    altarEntity.setBattleEndTime(level.getTime())
    return true
}


/**
 * 
 * @param {Internal.ServerLevel} level 
 * @param {BlockPos} blockPos 
 * @param {Internal.BlockPattern} pattern 
 * @returns 
 */
function matchPossibleArena(level, blockPos, pattern) {
    let patternPos = blockPos.offset(-pattern.getDepth() / 2, -1, -pattern.getWidth() / 2)

    let matchRes = pattern.matches(level, patternPos, Direction.SOUTH, Direction.DOWN)
    if (matchRes != null) {
        return matchRes
    }
    return null
}