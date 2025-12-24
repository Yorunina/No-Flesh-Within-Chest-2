// priority: 501
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage11(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.11.try_find_instrument'))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 1) {
        let instrumentEntities = GetLivingWithinRadius(level, pos, 16, (pLevel, pEntity) => {
            return pEntity.getMainHandItem().getItem() instanceof $InstrumentItem
        })
        if (instrumentEntities.length > 1) {
            CarnivalNextStage(data)
            CarnivalSetTimer(data, 200)

            let players = ctx.block.getPlayersInRadius(16)
            // todo
            // let melody = $ServerMelodyManager.getMelody('kubejs:ondine')
            players.forEach(pPlayer => {
                // $PacketSplitter.sendToPlayer('kubejs:ondine', melody, pPlayer)
                pPlayer.setStatusMessage(Text.translatable('msg.kubejs.carnibal_stage.11.find_instrument'))
            })
            return true
        }
        return false
    }
}