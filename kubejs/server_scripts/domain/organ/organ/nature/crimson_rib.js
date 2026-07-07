// priority: 500
RegistryOrgan('kubejs:crimson_rib')
    .addScore('chestcavity:defense', 0.5)
    .addScore('chestcavity:detoxification', 0.5)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.LootContextJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function CrimsonRibChestLootStrategy(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    if (!player) return
    if (RandomWithPlayerLuck(player) <= 0.5) return
    let speciesDom = RandomGet(['kubejs:meat_mushroom', 'kubejs:blood_marrow_root_spine', 'kubejs:softstem_grass'])
    let speciesRec = RandomGet(['kubejs:meat_mushroom', 'kubejs:blood_marrow_root_spine', 'kubejs:softstem_grass', speciesDom])
    event.addLoot(new AgricraftSeedBuilder(speciesDom, speciesRec).build())
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:crimson_rib')
        .addOnlyStrategy('chest_loot', CrimsonRibChestLootStrategy)
)