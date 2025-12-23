// priority: 500
/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @returns {boolean}
 */
function CarnivalStage4(ctx) {
    const pos = ctx.blockPos
    const level = ctx.level
    const data = ctx.data
    const subStage = data.getInt('subStage')
    let canTry = data.getInt('canTry')
    if (subStage == 0) {
        let musicItemId = RandomGet(Ingredient.of('#minecraft:music_discs').getItemIds())
        data.putString('musicItemId', musicItemId)
        let musicItemName = Item.of(musicItemId).getHoverName()
        CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.4.try_find_music', musicItemName))
        CarnivalNextSubStage(data)
        CarnivalSetTimer(data, 200)
        return true
    } else if (subStage == 1) {
        let musicItemId = data.getString('musicItemId')
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
                            if (displayedItem.is(musicItemId)) {
                                displayedItem.shrink(1)
                                if (displayedItem.count == 0) {
                                    pEntity.setDisplayedItem(Item.empty)
                                }
                                data.putInt('canTry', canTry + 1)
                                level.playSound(null, pPos.getX(), pPos.getY(), pPos.getZ(), 'minecraft:entity.player.burp', $SoundSource.BLOCKS, 1, 1)
                                CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.4.find_music'))
                                CarnivalNextStage(data)
                                CarnivalSetTimer(data, 200)
                                return true
                            }
                            if (displayedItem.hasTag('minecraft:music_discs')) {
                                displayedItem.shrink(1)
                                if (displayedItem.count == 0) {
                                    pEntity.setDisplayedItem(Item.empty)
                                }
                                level.playSound(null, pPos.getX(), pPos.getY(), pPos.getZ(), 'minecraft:entity.player.burp', $SoundSource.BLOCKS, 1, 1)
                                CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.4.no_find_target_music', musicItemName))
                                CarnivalNextStage(data)
                                CarnivalSetTimer(data, 200)
                                return true
                            }
                        }
                    }
                }
            }
        }

        if (canTry > 0) {
            data.putInt('canTry', canTry - 1)
            CarnivalAnnounceToPlayers(ctx, Text.translatable('msg.kubejs.carnibal_stage.try_again'))
            CarnivalSetTimer(data, 200)
            return true
        }
        return false
    }
}