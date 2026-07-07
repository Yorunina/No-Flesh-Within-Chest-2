// priority: 500
RegistryOrgan('kubejs:rocky_kidney')
    .addScore('chestcavity:filtration', 1)
    .addScore('chestcavity:detoxification', 0.5)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RockyKidneyChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    SetCustomDataMap(entity.chestCavityInstance, 'hasRockyKidney', 1)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RockyKidneyChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    RemoveCustomDataMap(entity.chestCavityInstance, 'hasRockyKidney')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rocky_kidney')
        .addOnlyStrategy('organ_take_on', RockyKidneyChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', RockyKidneyChestCavityTakeOff)
)
