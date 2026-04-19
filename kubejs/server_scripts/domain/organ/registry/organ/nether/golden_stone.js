// priority: 500
RegistryOrgan('kubejs:golden_stone')
    .addScore('chestcavity:defense', 2)
    .addScore('chestcavity:health', -0.5)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function GoldenStoneTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    entity.setWearingGold(false)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function GoldenStoneTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    entity.setWearingGold(true)
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:golden_stone')
    .addOnlyStrategy('organ_take_off', GoldenStoneTakeOff)
    .addOnlyStrategy('organ_take_on', GoldenStoneTakeOn)
)