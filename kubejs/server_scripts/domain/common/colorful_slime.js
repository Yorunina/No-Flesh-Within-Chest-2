// priority: 500
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.ENTITY)
        .entityPredicate(entity => entity.type == 'minecraft:slime' && entity instanceof $LivingEntity && entity.getActiveEffects().size() >= 7)
        .addLoot(LootEntry.of('kubejs:colorful_slime_ball'))
})