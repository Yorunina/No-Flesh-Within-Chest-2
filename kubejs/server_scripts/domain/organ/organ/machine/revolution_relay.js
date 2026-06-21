// priority: 500
RegistryOrgan('kubejs:revolution_relay')
    .addScore('chestcavity:nerves', 0.5)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionRelayChestCavityUpdateOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    SetCustomDataMap(chestCavity, 'furnaceCoreRelay', 0)
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionRelayChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let num = 1
    switch (slotType) {
        case MachinaryLubricant:
            num = num * 4
            break
        default:
            break
    }
    let value = GetCustomDataMap(chestCavity, 'furnaceCoreRelay', 0)
    SetCustomDataMap(chestCavity, 'furnaceCoreRelay', value + num)
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionRelayChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    SetCustomDataMap(chestCavity, 'furnaceCoreRelay', 0)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_relay')
        .addOnlyStrategy('chest_cavity_update', RevolutionRelayChestCavityUpdateOnly, 1)
        .addStrategy('chest_cavity_update', RevolutionRelayChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', RevolutionRelayChestCavityTakeOffOnly)
)