// priority: 500
RegistryOrgan('kubejs:greedy_stomach')
    .addScore('chestcavity:digestion', 0.5)
    .addScore('chestcavity:health', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.FoodEatenEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function GreedyStomachItemEaten(customData, event, organItem, organIndex, slotType) {
    event.player.giveExperiencePoints(10)
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:greedy_stomach')
        .addStrategy('item_eaten', GreedyStomachItemEaten)
)