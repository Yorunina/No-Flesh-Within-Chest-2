// priority: 501
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage1(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        let dyeItemId = RandomGet(Ingredient.of('#forge:dyes').getItemIds())
        data.putString('dyeItemId', dyeItemId)
        let dyeItemName = Item.of(dyeItemId).getHoverName()
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.1.try_find_color', dyeItemName))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 1) {
        let dyeItemId = data.getString('dyeItemId')
        for (let x = -12; x <= 12; x++) {
            for (let z = -12; z <= 12; z++) {
                for (let y = -1; y <= 3; y++) {
                    let pPos = pos.offset(x, y, z)
                    let pBlockState = level.getBlockState(pPos)
                    if (!pBlockState || pBlockState.isAir()) continue
                    if (pBlockState.is('supplementaries:pedestal')) {
                        let pEntity = level.getBlockEntity(pPos)
                        if (pEntity instanceof $PedestalBlockTile) {
                            let displayedItem = pEntity.getDisplayedItem()
                            if (displayedItem.is(dyeItemId)) {
                                displayedItem.shrink(1)
                                if (displayedItem.count == 0) {
                                    pEntity.setDisplayedItem(Item.empty)
                                }
                                level.playSound(null, pPos.getX(), pPos.getY(), pPos.getZ(), 'minecraft:entity.player.burp', $SoundSource.BLOCKS, 1, 1)
                                CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.1.find_color'))
                                CarnivalNextStage(data)
                                CarnivalSetTimer(data, 200)
                                return true
                            }
                        }
                    }
                }
            }
        }
        let canTry = data.getInt('canTry')
        if (canTry > 0) {
            data.putInt('canTry', canTry - 1)
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.try_again'))
            CarnivalSetTimer(data, 200)
            data.putInt('subStage', 0)
            return true
        }
        return false
    }
}