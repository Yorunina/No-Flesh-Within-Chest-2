// priority: 500
RegistryOrgan('kubejs:leviathan_rib')
    .addScore('chestcavity:defense', 3)
    .addScore('chestcavity:swim_speed', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LeviathanRibChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:sculk_tentacles', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LeviathanRibOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:sculk_tentacles')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:leviathan_rib')
        .addOnlyStrategy('chest_cavity_update', LeviathanRibChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', LeviathanRibOrganTakeOff)
)