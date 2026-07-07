// priority: 500
RegistryOrgan('kubejs:twinkle_rib')
    .addScore('chestcavity:defense', 0.5)
    .addScore('chestcavity:detoxification', 0.5)
// todo
/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.LootContextJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TwinkleRibChestLootStrategy(customData, event, organItem, organIndex, slotType) {
    const luck = event.getLuck()
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:twinkle_rib')
        .addOnlyStrategy('chest_loot', TwinkleRibChestLootStrategy)
)