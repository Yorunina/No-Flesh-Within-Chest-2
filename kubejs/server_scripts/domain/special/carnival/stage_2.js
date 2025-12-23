// priority: 500
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage2(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    if (subStage == 0) {
        let flowerItemId = RandomGet(Ingredient.of('#kubejs:the_carnival/flower').getItemIds())
        data.putString('flowerItemId', flowerItemId)
        let flowerItemName = Item.of(flowerItemId).getHoverName()
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.2.try_find_flower', flowerItemName))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 1) {
        let flowerItemId = data.getString('flowerItemId')
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
                            if (displayedItem.is(flowerItemId)) {
                                displayedItem.shrink(1)
                                if (displayedItem.count == 0) {
                                    pEntity.setDisplayedItem(Item.empty)
                                }
                                level.playSound(null, pPos.getX(), pPos.getY(), pPos.getZ(), 'minecraft:entity.player.burp', $SoundSource.BLOCKS, 1, 1)
                                CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.2.find_flower'))
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
            return true
        }
        return false
    }
}