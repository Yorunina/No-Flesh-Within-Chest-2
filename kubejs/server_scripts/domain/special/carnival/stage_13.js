// priority: 501
const CarnivalStage13SubStageText = [
    Text.translatable('msg.kubejs.carnibal_stage.13.carnival_end.0'),
    Text.translatable('msg.kubejs.carnibal_stage.13.carnival_end.1'),
    Text.translatable('msg.kubejs.carnibal_stage.13.carnival_end.2'),
]
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage13(ctx) {
    const data = ctx.data
    const pos = ctx.blockPos
    const level = ctx.level
    const subStage = data.getInt('subStage')
    if (subStage >= CarnivalStage13SubStageText.length) {
        CarnivalNextStage(data)
        return true
    }
    if (subStage == 0) {
        CarnivalLightsPositions.forEach(positionList => {
            positionList.forEach(position => {
                ChangeLightBlockColor(level, pos.offset(position[0], position[1], position[2]), $ParticleColor.BLACK)
            })
        })
    } else if (subStage == 1) {
        SpawnLootAtLocation(ctx.level, ctx.blockPos, [Item.of('kubejs:gula_injection')])
    }
    CarnivalAnnounceToPlayers(ctx, CarnivalStage13SubStageText[subStage])
    CarnivalNextSubStage(data)
    CarnivalSetTimer(data, 60)
    return true
}