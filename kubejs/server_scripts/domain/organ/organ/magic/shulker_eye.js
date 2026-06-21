// priority: 500
RegistryOrgan('kubejs:shulker_eye')
    .addScore('chestcavity:nerves', 1)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ShulkerEyeChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'irons_spellbooks:pocket_dimension', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ShulkerEyeTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'irons_spellbooks:pocket_dimension')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:shulker_eye')
        .addOnlyStrategy('chest_cavity_update', ShulkerEyeChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', ShulkerEyeTakeOff)
)