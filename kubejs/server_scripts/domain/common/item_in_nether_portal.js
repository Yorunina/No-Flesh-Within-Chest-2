// priority: 500
const InfinityPortalItem2Item = new Map()
function RegisterPortalItem2Item(item, item2) {
    InfinityPortalItem2Item.set(item, item2)
}
RegisterPortalItem2Item('minecraft:light_blue_dye', 'beyonddimensions:net_member_inviter')
RegisterPortalItem2Item('beyonddimensions:net_member_inviter', 'beyonddimensions:net_destroyer')
RegisterPortalItem2Item('beyonddimensions:net_destroyer', 'beyonddimensions:net_gifter')
RegisterPortalItem2Item('beyonddimensions:net_gifter', 'beyonddimensions:net_manager_inviter')
RegisterPortalItem2Item('beyonddimensions:net_manager_inviter', 'beyonddimensions:net_member_inviter')
RegisterPortalItem2Item('minecraft:diamond_block', 'beyonddimensions:net_pathway')

const InfinityPortalItem2DimId = new Map()
function RegisterPortalItem2DimId(dimItem, dimId) {
    InfinityPortalItem2DimId.set(dimItem, dimId)
}
RegisterPortalItem2DimId('minecraft:obsidian', 'infinity:cube')
RegisterPortalItem2DimId('minecraft:slime_ball', 'infinity:slime')
RegisterPortalItem2DimId('minecraft:grass_block', 'infinity:hills')
RegisterPortalItem2DimId('minecraft:cherry_leaves', 'infinity:spiral')
RegisterPortalItem2DimId('minecraft:sponge', 'infinity:sponge')
RegisterPortalItem2DimId('minecraft:stick', 'infinity:content')
RegisterPortalItem2DimId('minecraft:mossy_cobblestone', 'infinity:classic')
RegisterPortalItem2DimId('minecraft:bricks', 'infinity:isolation')
RegisterPortalItem2DimId('minecraft:black_wool', 'infinity:chess')
RegisterPortalItem2DimId('minecraft:book', 'infinity:library')
RegisterPortalItem2DimId('minecraft:glowstone', 'infinity:nexus')
RegisterPortalItem2DimId('minecraft:redstone', 'infinity:perfection')
RegisterPortalItem2DimId('minecraft:terracotta', 'infinity:custom')
RegisterPortalItem2DimId('minecraft:white_concrete', 'infinity:ant')
RegisterPortalItem2DimId('minecraft:dragon_egg', 'infinity:skygrid')
RegisterPortalItem2DimId('minecraft:gold_block', 'infinity:golden')
RegisterPortalItem2DimId('kubejs:elder_guardian_core', 'infinity:void')
RegisterPortalItem2DimId('minecraft:sandstone', 'infinity:redstone_flat')
RegisterPortalItem2DimId('minecraft:dragon_breath', 'infinity:missingno')
RegisterPortalItem2DimId('minecraft:shroomlight', 'infinity:cavern')
RegisterPortalItem2DimId('lightmanscurrency:coin_gold', 'infinity:room')
RegisterPortalItem2DimId('lightmanscurrency:coin_diamond', 'kubejs:oath')

InfinityEvents.itemInPortal(event => {
    const itemEntity = event.entity
    if (itemEntity.isOnPortalCooldown()) return
    /** @type {Internal.ItemStack} */
    const itemStack = itemEntity.getItem()
    const level = event.getLevel()
    if (level.isClientSide()) return
    const itemId = String(itemStack.getId())
    const pos = event.getPos()
    if (itemStack.is('kubejs:key_to_infinity')) {
        let nameString = 'infinity:random'
        if (itemStack.hasCustomHoverName()) {
            nameString = itemStack.getHoverName().getString()
        }
        if (!nameString.startsWith('infinity:')) {
            nameString = 'infinity:'.concat(nameString.trim())
        }
        itemEntity.remove('changed_dimension')
        InfinityPortalCreator.tryCreatePortalById(nameString, level, pos)
    } else if (itemStack.is('exposure:photograph') && itemStack.hasNBT() && !AStages.serverHasStage(FTBFinalTimerStart, event.server)) {
        let nbt = itemStack.getNbt()
        if (!nbt.contains('photograph_frame')) return
        let frameNbt = nbt.getCompound('photograph_frame')
        if (!frameNbt.contains('photographer')) return
        let photographerNbt = frameNbt.getCompound('photographer')
        let phtographerId = photographerNbt.getUUID('uuid')
        let targetPlayer = level.getPlayerByUUID(phtographerId)
        if (!targetPlayer) return
        if (!DimensionsNet.getPrimaryNetFromPlayer(targetPlayer)) {
            MAAUtils.createBDNetForPlayer(targetPlayer, null, 27)
            level.playSound(null, targetPlayer.getX(), targetPlayer.getY(), targetPlayer.getZ(), 'ui.toast.challenge_complete', targetPlayer.getSoundSource(), 0.25, 1)
        }
    } else if (InfinityPortalItem2Item.has(itemId)) {
        itemEntity.setPortalCooldown(200)
        itemEntity.setItem(Item.of(InfinityPortalItem2Item.get(itemId), itemStack.getCount()))
    } else if (InfinityPortalItem2DimId.has(itemId)) {
        itemEntity.remove('changed_dimension')
        InfinityPortalCreator.tryCreatePortalById(InfinityPortalItem2DimId.get(itemId), level, pos)
    }
})