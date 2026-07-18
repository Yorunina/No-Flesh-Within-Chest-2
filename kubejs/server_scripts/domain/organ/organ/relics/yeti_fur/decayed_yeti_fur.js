// priority: 500
RegistryOrgan('kubejs:decayed_yeti_fur')
    .addScore('chestcavity:defense', 2)
    .addScore('chestcavity:knockback_resistant', 2)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DecayedYetiFurChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:ice_tomb', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DecayedYetiFurTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:ice_tomb')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:decayed_yeti_fur')
        .addOnlyStrategy('chest_cavity_update', DecayedYetiFurChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', DecayedYetiFurTakeOff)
)