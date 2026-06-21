// priority: 500
RegistryOrgan('kubejs:devour_teeth')
    .addScore('chestcavity:strength', 1)
    .addScore('chestcavity:defense', 1)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DevourTeethChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:advance_devour', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DevourTeethTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:advance_devour')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:devour_teeth')
        .addOnlyStrategy('chest_cavity_update', DevourTeethChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', DevourTeethTakeOff)
)

