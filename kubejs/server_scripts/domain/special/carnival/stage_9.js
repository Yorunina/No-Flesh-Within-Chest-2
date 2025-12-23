// priority: 500
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage9(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        CarnivalLightsPositions.forEach(positionList => {
            positionList.forEach(position => {
                ChangeLightBlockColor(level, pos.offset(position[0], position[1], position[2]), $ParticleColor.RED)
            })
        })
        CarnivalSetTimer(data, 200)
        CarnivalNextSubStage(data)
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.9.celebration'))
        return true
    } else if (subStage == 1) {
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.9.try_find_food_bag'))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 2) {
        const canTry = data.getInt('canTry')
        let foodBagCount = 0
        for (let x = -12; x <= 12; x++) {
            for (let z = -12; z <= 12; z++) {
                for (let y = -1; y <= 3; y++) {
                    let pPos = pos.offset(x, y, z)
                    let pBlockState = level.getBlockState(pPos)
                    if (!pBlockState || pBlockState.isAir()) continue
                    if (pBlockState.is(CarnivalFoodBagTag)) {
                        foodBagCount++
                        if (foodBagCount >= 32) break
                    }
                }
            }
        }
        if ((foodBagCount < 32 && foodBagCount >= 32 - canTry) || foodBagCount >= 32) {
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.9.find_food_bag'))
            CarnivalNextSubStage(data)
            CarnivalSetTimer(data, 200)
            return true
        }
        return false
    }
}