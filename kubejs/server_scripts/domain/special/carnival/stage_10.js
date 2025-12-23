// priority: 500
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage10(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.10.try_find_armor'))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 1) {
        let armorStandEntities = GetLivingWithinRadius(level, player.blockPosition(), 12, (pLevel, pEntity) => {
            if (pEntity instanceof $ArmorStand) {
                pEntity.getArmorSlots().forEach(pSlot => {
                    if (!pSlot || pSlot.isEmpty()) {
                        return false
                    }
                })
                return true
            }
            return false
        })
        if (armorStandEntities.length > 1) {
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.10.find_armor'))
            CarnivalNextStage(data)
            CarnivalSetTimer(data, 200)
            return true
        }
        return false
    }
}