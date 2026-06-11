// priority: 500
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST)
        .anyDimension(['minecraft:overworld'])
        .addLoot(LootEntry.of('biomancy:healing_additive').when((c) => c.randomChance(0.5)))
        .addLoot(LootEntry.of('kubejs:organ_bundle').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of('biomancy:ageing_serum').when((c) => c.randomChance(0.05)))
        .addLoot(LootEntry.of('kubejs:organ_purification_tank').when((c) => c.randomChance(0.05)))
})



