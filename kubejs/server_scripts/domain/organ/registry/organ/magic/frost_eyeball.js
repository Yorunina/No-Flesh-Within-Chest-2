// priority: 500
RegistryOrgan('kubejs:frost_eyeball')
    .addScore('kubejs:crit_chance', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FrostEyeballChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'irons_spellbooks:icicle', 10)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FrostEyeballTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'irons_spellbooks:icicle')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:frost_eyeball')
        .addOnlyStrategy('chest_cavity_update', FrostEyeballChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', FrostEyeballTakeOff)
)