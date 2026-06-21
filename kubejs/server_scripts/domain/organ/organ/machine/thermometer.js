// priority: 500
RegistryOrgan('kubejs:thermometer')
    .addScore('chestcavity:fire_resistant', -2)
    .addScore('chestcavity:defense', -1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ThermometerEntityTickDefer(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity.isPlayer()) {
        let fireSeconds = Math.floor(entity.getRemainingFireTicks() / 20)
        let organEffect = new OragnEffectModel(organItem)
            .setPriority(organIndex)
            .setCustomText(Math.max(fireSeconds, 0).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}
/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ThermometerOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity.isPlayer()) {
        RemoveOrganEffect(chestCavity, 'kubejs:thermometer')
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:thermometer')
        .addOnlyStrategy('organ_take_off', ThermometerOrganTakeOff)
        .addOnlyStrategy('entity_tick', ThermometerEntityTickDefer, -1)
)