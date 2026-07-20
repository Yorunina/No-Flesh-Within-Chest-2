// priority: 500
RegistryOrgan('kubejs:immortal_volcanic_crystal')
    .addScore('chestcavity:strength', -1)
    .addScore('chestcavity:fire_resistant', 3)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ImmortalVolcanicCrystalUpdateChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:heat_surge', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ImmortalVolcanicCrystalTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:heat_surge')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:immortal_volcanic_crystal')
        .addOnlyStrategy('organ_take_off', ImmortalVolcanicCrystalTakeOff)
        .addOnlyStrategy('chest_cavity_update', ImmortalVolcanicCrystalUpdateChestCavityUpdate)
)