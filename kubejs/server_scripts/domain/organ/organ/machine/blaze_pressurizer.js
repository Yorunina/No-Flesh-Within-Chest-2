// priority: 500
RegistryOrgan('kubejs:blaze_pressurizer')
    .addScore('kubejs:extreme_strength', 1)
    .addScore('chestcavity:defense', -1)

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
    SetCustomDataMap(chestCavity, 'blazePressurizerCounter', 0)
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
    let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText(counter.toFixed(0))
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
        case MachinaryLubricant:
            counter = counter * 4
            break
        default:
            break
    }
    SetCustomDataMap(chestCavity, 'blazePressurizerCounter', counter)
    return counter
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:blaze_pressurizer')
        .addOnlyStrategy('organ_take_off', BlazePressurizerChestCavityTakeOffOnly)
        .addOnlyStrategy('key_active', BlazePressurizerKeyActiveOnly)
)