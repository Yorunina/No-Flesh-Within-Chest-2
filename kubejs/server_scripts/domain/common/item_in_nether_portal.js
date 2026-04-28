// priority: 500
const InfinityDimItem2DimId = {
    'minecraft:light_blue_dye': 'beyonddimensions:net_member_inviter',
    'beyonddimensions:net_member_inviter': 'beyonddimensions:net_destroyer',
    'beyonddimensions:net_destroyer': 'beyonddimensions:net_gifter',
    'beyonddimensions:net_gifter': 'beyonddimensions:net_manager_inviter',
    'beyonddimensions:net_manager_inviter': 'beyonddimensions:net_member_inviter',
    'minecraft:diamond_block': 'beyonddimensions:net_pathway',
}

const InfinityItem2Item = {
    'minecraft:obsidian': 'infinity:cube',
    'minecraft:slime_ball': 'infinity:slime',
    'minecraft:grass_block': 'infinity:hills',
    'minecraft:cherry_leaves': 'infinity:spiral',
    'minecraft:sponge': 'infinity:sponge',
    'minecraft:stick': 'infinity:content',
    'minecraft:mossy_cobblestone': 'infinity:classic',
    'minecraft:bricks': 'infinity:isolation',
    'minecraft:black_wool': 'infinity:chess',
    'minecraft:book': 'infinity:library',
    'minecraft:glowstone': 'infinity:nexus',
    'minecraft:redstone': 'infinity:perfection',
    'minecraft:terracotta': 'infinity:custom',
    'minecraft:white_concrete': 'infinity:ant',
    'minecraft:dragon_egg': 'infinity:skygrid',
    'minecraft:gold_block': 'infinity:golden',
    'kubejs:elder_guardian_core': 'infinity:void',
    "minecraft:sandstone": "infinity:redstone_flat",
    "minecraft:dragon_breath": "infinity:missingno",
    "minecraft:shroomlight": "infinity:cavern",
}

InfinityEvents.itemInPortal(event => {
    const itemEntity = event.entity
    if (itemEntity.isOnPortalCooldown()) return
    /** @type {Internal.ItemStack} */
    const itemStack = itemEntity.getItem()
    const level = event.getLevel()
    if (level.isClientSide()) return

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
    } else if (itemStack.hasTag('lightmanscurrency:coins')) {
        itemEntity.remove('changed_dimension')
        InfinityPortalCreator.tryCreatePortalById('kubejs:oath', level, pos)
    } else if (itemStack.is('exposure:photograph') && itemStack.hasNBT() && !AStages.serverHasStage(FTBFinalTimerStart, event.server)) {
        let nbt = itemStack.getNbt()
        if (!nbt.contains('photograph_frame')) return
        let frameNbt = nbt.getCompound('photograph_frame')
        if (!frameNbt.contains('photographer')) return
        let photographerNbt = frameNbt.getCompound('photographer')
        let phtographerId = photographerNbt.getUUID('uuid')
        let targetPlayer = level.getPlayerByUUID(phtographerId)
        if (!targetPlayer) return
        if (!DimensionsNet.getNetFromPlayer(targetPlayer)) {
            DimensionsNet.createNewNetForPlayer(targetPlayer, 1024, 27)
            level.playSound(null, targetPlayer.getX(), targetPlayer.getY(), targetPlayer.getZ(), 'ui.toast.challenge_complete', targetPlayer.getSoundSource(), 0.25, 1)
        }
    } else if (InfinityDimItem2DimId[itemStack.getId().toString()]) {
        itemEntity.setPortalCooldown(200)
        itemEntity.setItem(Item.of(InfinityDimItem2DimId[itemStack.getId().toString()], itemStack.getCount()))
    } else {
        let dimId = InfinityDimItem2DimId[itemStack.getId().toString()]
        if (!dimId) return
        itemEntity.remove('changed_dimension')
        InfinityPortalCreator.tryCreatePortalById(dimId, level, pos)
    }
})