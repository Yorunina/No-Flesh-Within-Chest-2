// priority: 500
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage8(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.8.try_find_beer'))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 1) {
        let beerCount = 0
        for (let x = -12; x <= 12; x++) {
            for (let z = -12; z <= 12; z++) {
                for (let y = -1; y <= 3; y++) {
                    let pPos = pos.offset(x, y, z)
                    let pBlockState = level.getBlockState(pPos)
                    if (!pBlockState || pBlockState.isAir()) continue
                    if (pBlockState.is(CarnivalBeerTag)) {
                        beerCount++
                        level.removeBlock(pPos)
                        if (beerCount >= 32) break
                    }
                }
            }
        }
        level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), 'minecraft:entity.player.burp', $SoundSource.BLOCKS, 1, 1)
        const canTry = data.getInt('canTry')
        data.putInt('canTry', canTry + Math.min(beerCount / 4, 8))
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.8.find_beer'))
        CarnivalNextStage(data)
        CarnivalSetTimer(data, 200)
        return true
    }
}