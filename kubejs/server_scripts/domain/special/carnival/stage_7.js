// priority: 500
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage7(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.7.try_find_feasts'))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 1) {
        let feastsCount = 0
        let feastsTypeList = []
        for (let x = -12; x <= 12; x++) {
            for (let z = -12; z <= 12; z++) {
                for (let y = -1; y <= 3; y++) {
                    let pPos = pos.offset(x, y, z)
                    let pBlockState = level.getBlockState(pPos)
                    if (!pBlockState || pBlockState.isAir()) continue
                    if (pBlockState.is(CarnivalFeastsTag)) {
                        if (feastsTypeList.indexOf(pBlockState.getBlock().getId()) == -1) {
                            feastsTypeList.push(pBlockState.getBlock().getId())
                        }
                        feastsCount++
                        level.removeBlock(pPos)
                        if (feastsTypeList.length >= 6 && feastsCount >= 16) break
                    }
                }
            }
        }
        let feastsTypeCount = feastsTypeList.length
        level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), 'minecraft:entity.player.burp', $SoundSource.BLOCKS, 1, 1)
        if (feastsTypeCount >= 6 && feastsCount >= 16) {
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.7.find_feasts'))
            CarnivalNextStage(data)
            CarnivalSetTimer(data, 200)
            return true
        }
        return false
    }
}