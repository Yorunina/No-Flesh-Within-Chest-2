// priority: 500
RegistryOrgan('kubejs:gula_beacon')
    .addScore('chestcavity:health', 1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function GulaBeaconChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.isPlayer()) return
    if (!(entity instanceof $PathfinderMob)) return
    RemoveCustomGoalByName(entity.goalSelector, 'gula_challenge')
    entity.goalSelector.addGoal(0, NewGulaChallengeGoal(entity))
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function GulaBeaconChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.isPlayer()) return
    if (!(entity instanceof $PathfinderMob)) return
    RemoveCustomGoalByName(entity.goalSelector, 'gula_challenge')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:gula_beacon')
        .addOnlyStrategy('organ_take_on', GulaBeaconChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', GulaBeaconChestCavityTakeOff)
)