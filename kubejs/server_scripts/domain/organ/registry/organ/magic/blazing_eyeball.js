// priority: 500
RegistryOrgan('kubejs:blazing_eyeball')
    .addScore('kubejs:crit_chance', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BlazingEyeballChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'irons_spellbooks:firebolt', 10)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BlazingEyeballTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'irons_spellbooks:firebolt')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:blazing_eyeball')
        .addOnlyStrategy('chest_cavity_update', BlazingEyeballChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', BlazingEyeballTakeOff)
)