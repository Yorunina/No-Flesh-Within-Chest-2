// priority: 500
BlockEvents.rightClicked('biomancy:malignant_flesh', event => {
    const level = event.level
    const item = event.item
    if (!item.is('biomancy:bloomberry')) return
    const player = event.player
    if (!player) return
    if (!AStages.serverAndPlayerHasStage('ftb_primal_bloom_plant', player)) return
    const facing = event.facing
    const block = event.block
    const pos = block.pos
    let targetPos = pos.relative(facing)

    let targetBlockState = Block.id('biomancy:primal_bloom').getBlockState().setValue(BlockProperties.FACING, facing)
    if (level.getFluidState(targetPos).getType().isSame('minecraft:water')) {
        targetBlockState = targetBlockState.setValue(BlockProperties.WATERLOGGED, $Boolean.TRUE)
    }
    level.setBlockAndUpdate(targetPos, targetBlockState)
    level.playSound(null, targetPos.getX(), targetPos.getY(), targetPos.getZ(), 'biomancy:flesh_block.place', player.getSoundSource(), 1, 1)
    item.shrink(1)
})
