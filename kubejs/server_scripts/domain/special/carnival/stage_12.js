// priority: 501
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage12(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.12.try_find_treasure'))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 1) {
        let canTry = data.getInt('canTry')
        let treasureCount = 0
        for (let x = -12; x <= 12; x++) {
            for (let z = -12; z <= 12; z++) {
                for (let y = -1; y <= 3; y++) {
                    let pPos = pos.offset(x, y, z)
                    let pBlockState = level.getBlockState(pPos)
                    if (!pBlockState || pBlockState.isAir()) continue
                    if (pBlockState.getTags().anyMatch(tag => tag == CarnivalTreasureTag)) {
                        treasureCount++
                        if (treasureCount >= 16) break
                    }
                }
            }
        }
        if ((treasureCount < 16 && treasureCount >= 16 - canTry) || treasureCount >= 16) {
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.12.find_treasure'))
            CarnivalNextStage(data)
            CarnivalSetTimer(data, 600)
            return true
        }
        return false
    }
}