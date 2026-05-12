// priority: 500
RegistryOrgan('kubejs:hop_kidney')
    .addScore('chestcavity:detoxification', 0.5)
    .addScore('chestcavity:filtration', 1.5)
    .addScore('kubejs:photosynthesis', 0.5)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function HopKidneyKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    $AlcoholManager.drinkAlcohol(player)
    player.addItemCooldown(organItem, 20 * 5)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:hop_kidney')
        .addOnlyStrategy('key_active', HopKidneyKeyActive)
)
