// priority: 501
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage0(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage >= CarnivalLightsPositions.length) {
        CarnivalNextStage(data)
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.0.success'))
        CarnivalSetTimer(data, 200)
        return true
    }
    CarnivalLightsPositions[subStage].forEach(lightPos => {
        let pPos = pos.offset(lightPos[0], lightPos[1], lightPos[2])
        let blockState = level.getBlockState(pPos)
        if (!blockState || blockState.isAir()) {
            PlaceLightBlock(level, pPos)
            level.playSound(null, pPos.getX(), pPos.getY(), pPos.getZ(), 'minecraft:block.wool.place', $SoundSource.BLOCKS, 1, 1)
        }
    })
    level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), 'minecraft:block.bell.use', $SoundSource.BLOCKS, 1, 1)

    CarnivalNextSubStage(data)
    CarnivalSetTimer(data, 60)
    return true
}

