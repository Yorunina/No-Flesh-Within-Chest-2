// priority: 500
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage5(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        CarnivalLightsPositions.forEach(positionList => {
            positionList.forEach(position => {
                ChangeLightBlockColor(level, pos.offset(position[0], position[1], position[2]), $ParticleColor.BLUE)
            })
        })
        CarnivalSetTimer(data, 200)
        CarnivalNextSubStage(data)
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.5.celebration'))
        return true
    } else if (subStage == 1) {
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.5.try_find_bread'))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 2) {
        const canTry = data.getInt('canTry')
        let breadCount = 0
        for (let x = -12; x <= 12; x++) {
            for (let z = -12; z <= 12; z++) {
                for (let y = -1; y <= 3; y++) {
                    let pPos = pos.offset(x, y, z)
                    let pBlockState = level.getBlockState(pPos)
                    if (!pBlockState || pBlockState.isAir()) continue
                    if (pBlockState.is(CarnivalBreadTag)) {
                        breadCount++
                        level.removeBlock(pPos)
                        if (breadCount >= 16) break
                    }
                }
            }
        }
        level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), 'minecraft:entity.player.burp', $SoundSource.BLOCKS, 1, 1)
        if (breadCount < 16 && breadCount >= 16 - canTry) {
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.5.need_more_bread'))
            data.putInt('canTry', canTry - (16 - breadCount))
            CarnivalNextSubStage(data)
            CarnivalSetTimer(data, 200)
            return true
        } else if (breadCount >= 16) {
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.5.find_bread'))
            CarnivalNextStage(data)
            CarnivalSetTimer(data, 200)
            return true
        }
        return false
    }
}