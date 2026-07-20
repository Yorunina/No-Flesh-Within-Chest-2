// priority: 500
RegistryOrgan('kubejs:eternal_cold_crystal')
    .addScore('chestcavity:defense', 1)
    .addScore('chestcavity:knockback_resistant', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EternalColdCrystalChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:ice_aura', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EternalColdCrystalTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:ice_aura')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:eternal_cold_crystal')
        .addOnlyStrategy('chest_cavity_update', EternalColdCrystalChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', EternalColdCrystalTakeOff)
)