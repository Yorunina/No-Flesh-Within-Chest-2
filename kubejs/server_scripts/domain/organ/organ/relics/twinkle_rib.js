// priority: 500
RegistryOrgan('kubejs:twinkle_rib')
    .addScore('chestcavity:defense', 0.5)
    .addScore('chestcavity:detoxification', 0.5)


/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.LootContextJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TwinkleRibChestLootStrategy(customData, event, organItem, organIndex, slotType) {
    const loot = event.loot
    if (organItem.getDamageValue() >= organItem.getMaxDamage()) return
    event.addLoot(RandomGet(loot))
    const lootTableId = event.lootTableId
    if (lootTableId.getPath().startsWith('chests/village/')) {
        event.addLoot(LootEntry.of('kubejs:relic_paper'))
        // .withChance(0.1)
    } else if (lootTableId.getNamespace() == 'graveyard') {
        event.addLoot(LootEntry.of('kubejs:relic_metal'))
        // .withChance(0.2)
    } else if (lootTableId.getPath().endsWith('buried_treasure')) {
        event.addLoot(LootEntry.of('kubejs:relic_gem'))
    }
    organItem.setDamageValue(organItem.getDamageValue() + 1)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:twinkle_rib')
        .addStrategy('chest_loot', TwinkleRibChestLootStrategy)
)