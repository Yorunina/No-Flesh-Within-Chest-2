// priority: 500
RegistryOrgan('kubejs:revolution_cable')
    .addScore('chestcavity:endurance', 1.5)
    .addScore('chestcavity:nerves', 0.5)

RegistryOrgan('kubejs:revolution_relay')
    .addScore('chestcavity:nerves', 0.5)

RegistryOrgan('kubejs:revolution_delay')
    .addScore('chestcavity:nerves', 0.5)

RegistryOrgan('kubejs:revolution_bell')
    .addScore('chestcavity:endurance', 1.5)
    .addScore('chestcavity:metabolism', -0.5)

RegistryOrgan('kubejs:blaze_pressurizer')
    .addScore('chestcavity:strength', 1)
    .addScore('chestcavity:defense', -1)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionCableChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let machineCount = chestCavity.inventory.count('#kubejs:machine')
    let revolutionCount = chestCavity.inventory.count('#kubejs:revolution')
    customData.maxHealth.addAttributeModifier((machineCount + revolutionCount) * 2, 'addition', 'base')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_cable')
        .addOnlyStrategy('chest_cavity_update', RevolutionCableChestCavityUpdate)
)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionRelayChestCavityUpdateOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let num = chestCavity.inventory.countItem('kubejs:revolution_relay')
    chestCavity.customEntityDataMap.put('furnaceCoreRelay', num)
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
    chestCavity.customEntityDataMap.put('furnaceCoreRelay', 0)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_relay')
        .addOnlyStrategy('chest_cavity_update', RevolutionRelayChestCavityUpdateOnly)
        .addOnlyStrategy('organ_take_off', RevolutionRelayChestCavityTakeOffOnly)
)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionDelayChestCavityUpdateOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let num = chestCavity.inventory.countItem('kubejs:revolution_delay')
    chestCavity.customEntityDataMap.put('burningHeartDelay', num)
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
    chestCavity.customEntityDataMap.put('burningHeartDelay', 0)
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_delay')
        .addOnlyStrategy('chest_cavity_update', RevolutionDelayChestCavityUpdateOnly)
        .addOnlyStrategy('organ_take_off', RevolutionDelayChestCavityTakeOffOnly)
)



/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionBellChestCavityUpdateOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    chestCavity.customEntityDataMap.put('haveRevolutionBell', true)
}
/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RevolutionBellChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    chestCavity.customEntityDataMap.put('haveRevolutionBell', false)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_bell')
        .addOnlyStrategy('chest_cavity_update', RevolutionBellChestCavityUpdateOnly)
        .addOnlyStrategy('organ_take_off', RevolutionBellChestCavityTakeOffOnly)
)





/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function BlazePressurizerChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    chestCavity.customEntityDataMap.put('blazePressurizerCounter', 0)
    RemoveOrganEffect(chestCavity, 'kubejs:blaze_pressurizer')
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function BlazePressurizerKeyActiveOnly(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const chestCavity = player.chestCavityInstance
    let counter = 5
    chestCavity.customEntityDataMap.put('blazePressurizerCounter', counter)
    let organEffect = new OragnEffectModel(organItem).setPriority(200).setCustomText(counter.toFixed(0))
    SetOrganEffect(chestCavity, organEffect)
    player.addItemCooldown('kubejs:blaze_pressurizer', 20 * 30)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:blaze_pressurizer')
        .addOnlyStrategy('organ_take_off', BlazePressurizerChestCavityTakeOffOnly)
        .addOnlyStrategy('key_active', BlazePressurizerKeyActiveOnly)
)