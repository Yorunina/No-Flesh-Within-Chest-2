// priority: 500
RegistryOrgan('kubejs:calamity_bone_spur')
    .addScore('chestcavity:defense', 2)
    .addScore('kubejs:magic_capacity', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function CalamityBoneSpurChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:advance_fang_strike', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function CalamityBoneSpurTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:advance_fang_strike')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:calamity_bone_spur')
        .addOnlyStrategy('chest_cavity_update', CalamityBoneSpurChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', CalamityBoneSpurTakeOff)
)