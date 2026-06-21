// priority: 500
RegistryOrgan('kubejs:hatching_chamber')
    .addScore('chestcavity:endurance', 1)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function HatchingChamberChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!(entity instanceof $PathfinderMob)) return
    RemoveCustomGoalByName(entity.goalSelector, 'lay_loot')
    entity.goalSelector.addGoal(0, NewLayLootGoal(entity))
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function HatchingChamberChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!(entity instanceof $PathfinderMob)) return
    RemoveCustomGoalByName(entity.goalSelector, 'lay_loot')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:hatching_chamber')
        .addOnlyStrategy('organ_take_on', HatchingChamberChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', HatchingChamberChestCavityTakeOff)
)
