// priority: 500
// todo
RegistryOrgan('kubejs:color_finder')
    .addScore('chestcavity:defense', 1.5)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ColorFinderChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!(entity instanceof $PathfinderMob)) return
    RemoveCustomGoalByName(entity.goalSelector, 'lay_egg')
    entity.goalSelector.addGoal(0, NewLayEggGoal(entity))
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ColorFinderChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!(entity instanceof $PathfinderMob)) return
    RemoveCustomGoalByName(entity.goalSelector, 'lay_egg')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:color_finder')
        .addOnlyStrategy('organ_take_on', ColorFinderChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', ColorFinderChestCavityTakeOff)
)
