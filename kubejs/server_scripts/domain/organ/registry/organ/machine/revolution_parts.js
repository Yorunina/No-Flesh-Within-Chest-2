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
    let total = revolutionCount + machineCount
    switch (slotType) {
        case 'machinary_lubricant':
            customData.maxHealth.addAttributeModifier(total * 4, 'addition', 'base')
            break
        default:
            customData.maxHealth.addAttributeModifier(total, 'addition', 'base')
            break
    }
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
    chestCavity.customDataMap.put('furnaceCoreRelay', 0)
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
        case 'machinary_lubricant':
            num = num * 4
            break
        default:
            break
    }
    let value = chestCavity.customDataMap.getOrDefault('furnaceCoreRelay', 0)
    chestCavity.customDataMap.put('furnaceCoreRelay', value + num)
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
    chestCavity.customDataMap.put('furnaceCoreRelay', 0)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_relay')
        .addOnlyStrategy('chest_cavity_update', RevolutionRelayChestCavityUpdateOnly, 1)
        .addStrategy('chest_cavity_update', RevolutionRelayChestCavityUpdate)
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
    chestCavity.customDataMap.put('burningHeartDelay', 0)
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
        case 'machinary_lubricant':
            num = num * 4
            break
        default:
            break
    }
    let value = chestCavity.customDataMap.getOrDefault('burningHeartDelay', 0)
    chestCavity.customDataMap.put('burningHeartDelay', value + num)
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
    chestCavity.customDataMap.put('burningHeartDelay', 0)
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_delay')
        .addOnlyStrategy('chest_cavity_update', RevolutionDelayChestCavityUpdateOnly, 1)
        .addStrategy('chest_cavity_update', RevolutionDelayChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', RevolutionDelayChestCavityTakeOffOnly)
)


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:revolution_bell')
)



/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function BlazePressurizerChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    chestCavity.customDataMap.put('blazePressurizerCounter', 0)
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:blaze_pressurizer')
    }
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
    let counter = BlazePressurizerActive(chestCavity, slotType)
    let organEffect = new OragnEffectModel(organItem).setPriority(101).setCustomText(counter.toFixed(0))
    SetOrganEffect(chestCavity, organEffect)
    player.addItemCooldown(organItem, 20 * 30)
}

/**
 * 
 * @param {Internal.ChestCavityInstance} chestCavity 
 * @param {string} slotType 
 * @returns {number}
 */
function BlazePressurizerActive(chestCavity, slotType) {
    let counter = 3
    switch (slotType) {
        case 'machinary_lubricant':
            counter = counter * 4
            break
        default:
            break
    }
    chestCavity.customDataMap.put('blazePressurizerCounter', counter)
    return counter
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:blaze_pressurizer')
        .addOnlyStrategy('organ_take_off', BlazePressurizerChestCavityTakeOffOnly)
        .addOnlyStrategy('key_active', BlazePressurizerKeyActiveOnly)
)