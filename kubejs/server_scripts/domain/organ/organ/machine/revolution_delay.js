// priority: 500
RegistryOrgan('kubejs:revolution_delay')
    .addScore('chestcavity:nerves', 0.5)
    
/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionDelayChestCavityUpdateOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    SetCustomDataMap(chestCavity, 'burningHeartDelay', 0)
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionDelayChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let num = 1
    switch (slotType) {
        case MachinaryLubricant:
            num = num * 4
            break
        default:
            break
    }
    let value = GetCustomDataMap(chestCavity, 'burningHeartDelay', 0)
    SetCustomDataMap(chestCavity, 'burningHeartDelay', value + num)
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionDelayChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    SetCustomDataMap(chestCavity, 'burningHeartDelay', 0)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_delay')
        .addOnlyStrategy('chest_cavity_update', RevolutionDelayChestCavityUpdateOnly, 1)
        .addStrategy('chest_cavity_update', RevolutionDelayChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', RevolutionDelayChestCavityTakeOffOnly)
)