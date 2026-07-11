// priority: 500
StartupEvents.registry('block', event => {
    event.create('kubejs:infinity_soil', 'basic').textureAll('kubejs:block/soil/infinity_soil')
        .blockEntity(ctx => {
            ctx.tick(5, 0, pCtx => {
                const level = pCtx.level
                if (level.isClientSide()) return
                const targetBlockPos = pCtx.blockPos.above()
                let pBlockEntity = level.getBlockEntity(targetBlockPos)
                if (pBlockEntity instanceof $CropBlockEntity) {
                    if (pBlockEntity.canBeHarvested()) return
                    pBlockEntity.modpackActuallyAdditions$forceApplyGrowthTick()
                }
            })
        })
        .grassSoundType()
})