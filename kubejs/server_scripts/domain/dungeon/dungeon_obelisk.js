// priority: 3000
BlockEvents.broken('kubejs:dungeon_obelisk', event => {
    const block = event.block
    const level = event.level
    if (!block.getBlockState().hasProperty(BlockProperties.DOUBLE_BLOCK_HALF)) return
    const half = block.getBlockState().getValue(BlockProperties.DOUBLE_BLOCK_HALF)
    const pos = block.getPos()
    switch (half) {
        case 'lower':
            let aboveBlock = level.getBlock(pos.above())
            if (aboveBlock.id != 'kubejs:dungeon_obelisk') return
            level.setBlock(pos.above(), Blocks.AIR.defaultBlockState(), 3)
            break
        case 'upper':
            let belowBlock = level.getBlock(pos.below())
            if (belowBlock.id != 'kubejs:dungeon_obelisk') return
            level.setBlock(pos.below(), Blocks.AIR.defaultBlockState(), 3)
            break
    }
})

BlockEvents.placed('kubejs:dungeon_obelisk', event => {
    const block = event.block
    const level = event.level
    if (!block.getBlockState().hasProperty(BlockProperties.DOUBLE_BLOCK_HALF)) return 
    const half = block.getBlockState().getValue(BlockProperties.DOUBLE_BLOCK_HALF)
    const pos = block.getPos()
    switch (half) {
        case 'lower':
            level.setBlock(pos.above(), block.blockState.setValue(BlockProperties.DOUBLE_BLOCK_HALF, $DoubleBlockHalf.UPPER), 3)
            break
        case 'upper':
            level.setBlock(pos.below(), block.getBlockState().set(BlockProperties.DOUBLE_BLOCK_HALF, $DoubleBlockHalf.LOWER), 3)
            break 
    }
})