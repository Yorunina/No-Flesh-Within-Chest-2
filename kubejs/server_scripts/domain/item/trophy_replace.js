// priority: 500
ItemEvents.rightClicked('trophymanager:trophy', event => {
    const player = event.player
    const item = event.item
    let itemBase = player.getItemInHand(event.hand == 'MAIN_HAND' ? 'OFF_HAND' : 'MAIN_HAND')
    if (!itemBase || !itemBase.isBlock()) return
    let baseBlock = Block.getBlock(itemBase.getIdLocation())
    if (item.hasNBT() && baseBlock) {
        item.nbt.merge({ 'BaseBlock': baseBlock.id })
    }
})

ItemEvents.entityInteracted('trophymanager:trophy', event => {
    let { player, item, target, hand } = event
    let itemTro = $TrophyBlock.createTrophy(target, target.getNbt())

    if (itemTro) {
        if (item.hasNBT() && itemTro.hasNBT() && item.nbt.contains('BaseBlock')) {
            itemTro.nbt.putString('BaseBlock', item.nbt.getString('BaseBlock'))
        }
        player.setItemInHand(hand, itemTro)
    }
})

LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.ENTITY)
        .matchEquip('mainhand', Item.of('kubejs:trophy_sword'))
        .apply(ctx => {
            const entity = ctx.entity
            let itemTro = $TrophyBlock.createTrophy(entity, entity.getNbt())
            if (itemTro) {
                itemTro.nbt.putString('BaseBlock', 'minecraft:smooth_stone_slab')
                ctx.addLoot(itemTro)
            }
        }
    )
})