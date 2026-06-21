
// priority: 500
RegistryOrgan('kubejs:allay_wing')
    .addScore('chestcavity:speed', 1)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function AllayWingChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!(entity instanceof $OwnableEntity)) return
    if (entity.type == 'minecraft:allay') return
    RemoveCustomGoalByName(entity.goalSelector, 'pick_item_for_player')
    entity.goalSelector.addGoal(0, NewPickItemForPlayerGoal(entity))
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function AllayWingChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!(entity instanceof $OwnableEntity)) return
    if (entity.type == 'minecraft:allay') return
    RemoveCustomGoalByName(entity.goalSelector, 'pick_item_for_player')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:allay_wing')
        .addOnlyStrategy('organ_take_on', AllayWingChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', AllayWingChestCavityTakeOff)
)