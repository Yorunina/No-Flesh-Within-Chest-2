// priority: 500
RegistryOrgan('kubejs:bridge_mod')
    .addScore('chestcavity:speed', -1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BridgeModTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.isPlayer()) entity.setMapTeleportBypass(false)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BridgeModTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.isPlayer()) entity.setMapTeleportBypass(true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:bridge_mod')
        .addOnlyStrategy('organ_take_off', BridgeModTakeOff)
        .addOnlyStrategy('organ_take_on', BridgeModTakeOn)
)