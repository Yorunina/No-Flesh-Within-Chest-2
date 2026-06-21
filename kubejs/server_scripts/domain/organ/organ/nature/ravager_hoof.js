// priority: 500
RegistryOrgan('kubejs:ravager_hoof')
    .addScore('chestcavity:defense', 1)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RavagerHoofChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:advance_stomp', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RavagerHoofTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:advance_stomp')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ravager_hoof')
        .addOnlyStrategy('chest_cavity_update', RavagerHoofChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', RavagerHoofTakeOff)
)