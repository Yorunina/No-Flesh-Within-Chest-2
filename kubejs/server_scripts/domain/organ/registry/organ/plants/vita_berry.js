// priority: 500
RegistryOrgan('kubejs:vita_berry')
    .addScore('chestcavity:endurance', 1.5)
    .addScore('kubejs:photosynthesis', 0.5)


/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function VitaBerryChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    SetCustomDataMap(entity.chestCavityInstance, 'hasVitaBerry', 1)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function VitaBerryChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    RemoveCustomDataMap(entity.chestCavityInstance, 'hasVitaBerry')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:vita_berry')
        .addOnlyStrategy('organ_take_on', VitaBerryChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', VitaBerryChestCavityTakeOff)
)