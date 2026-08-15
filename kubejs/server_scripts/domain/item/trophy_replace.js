// priority: 500
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