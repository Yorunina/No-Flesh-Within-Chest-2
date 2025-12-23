// priority: 500
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage6(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.6.try_find_cake'))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 1) {
        const canTry = data.getInt('canTry')
        let cakeTypeList = []
        for (let x = -12; x <= 12; x++) {
            for (let z = -12; z <= 12; z++) {
                for (let y = -1; y <= 3; y++) {
                    let pPos = pos.offset(x, y, z)
                    let pBlockState = level.getBlockState(pPos)
                    if (!pBlockState || pBlockState.isAir()) continue
                    if (pBlockState.is(CarnivalCakeTag)) {
                        if (cakeTypeList.indexOf(pBlockState.getBlock().getId()) == -1) {
                            cakeTypeList.push(pBlockState.getBlock().getId())
                        }
                        level.removeBlock(pPos)
                        if (cakeTypeList.length >= 6) break
                    }
                }
            }
        }
        let cakeTypeCount = cakeTypeList.length
        level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), 'minecraft:entity.player.burp', $SoundSource.BLOCKS, 1, 1)
        if (cakeTypeCount < 6 && cakeTypeCount >= 6 - canTry) {
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.6.need_more_cake'))
            data.putInt('canTry', canTry - (6 - cakeTypeCount))
            CarnivalNextStage(data)
            CarnivalSetTimer(data, 200)
            return true
        } else if (cakeTypeCount >= 6) {
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.6.find_cake'))
            CarnivalNextStage(data)
            CarnivalSetTimer(data, 200)
            return true
        }
        return false
    }
}