// priority: 900
global.BlockProperties.OBELISK_STATE = $IntegerProperty.create('obelisks_state', 0, 15)
StartupEvents.registry('block', event => {
    event.create('kubejs:dungeon_obelisk')
        .property(BlockProperties.DOUBLE_BLOCK_HALF)
        .property(global.BlockProperties.OBELISK_STATE)
        .defaultState(defaultState => {
            defaultState.set(BlockProperties.DOUBLE_BLOCK_HALF, 'lower')
            defaultState.set(global.BlockProperties.OBELISK_STATE, 0)
        })
        .item(item => {
            // item.texture()
        })
        .blockEntity(blockEntityInfo => {
        })
        .defaultTranslucent()
        .unbreakable()
        .randomTick(ctx => {
            const block = ctx.block
            const level = ctx.level
            const blockState = block.getBlockState()
            if (!blockState.hasProperty(BlockProperties.DOUBLE_BLOCK_HALF)) return
            const half = blockState.getValue(BlockProperties.DOUBLE_BLOCK_HALF)
            const pos = block.getPos()
            // 校验是否是下半部分
            if (half == 'upper') return
            const upperPos = pos.above()
            const upperBlock = level.getBlock(upperPos)
            const upperBlockState = upperBlock.getBlockState()

            // 校验是否是完整的
            if (upperBlock.id != 'kubejs:dungeon_obelisk') return
            // if (!upperBlockState.hasProperty(BlockProperties.DOUBLE_BLOCK_HALF)) return
            // if (upperBlockState.getValue(BlockProperties.DOUBLE_BLOCK_HALF) != 'upper') return

            if (!blockState.hasProperty(global.BlockProperties.OBELISK_STATE)) return
            let stage = blockState.getValue(global.BlockProperties.OBELISK_STATE).intValue()
            if (stage < 3) return
            if (Math.random() < 0.05) return

            level.setBlockAndUpdate(pos, blockState.setValue(global.BlockProperties.OBELISK_STATE, Int2Integer(0)))
            level.setBlockAndUpdate(upperPos, upperBlockState.setValue(global.BlockProperties.OBELISK_STATE, Int2Integer(0)))
        })

})