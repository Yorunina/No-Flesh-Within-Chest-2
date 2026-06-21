// priority: 500
RegistryOrgan('kubejs:tentacles_harvester')
    .addScore('chestcavity:digestion', 1)
    .addScore('chestcavity:defense', -2)


/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TentaclesHarvesterChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    SetCustomDataMap(entity.chestCavityInstance, 'hasTentaclesHarvester', 1)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TentaclesHarvesterChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    RemoveCustomDataMap(entity.chestCavityInstance, 'hasTentaclesHarvester')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:tentacles_harvester')
        .addOnlyStrategy('organ_take_on', TentaclesHarvesterChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', TentaclesHarvesterChestCavityTakeOff)
)