// priority: 500
LootJS.modifiers(event => {
    event.addEntityLootModifier('minecraft:slime')
        .entityPredicate(entity => entity instanceof $LivingEntity && entity.getActiveEffects().size() >= 7)
        .addLoot(LootEntry.of('kubejs:colorful_slime_ball'))
})