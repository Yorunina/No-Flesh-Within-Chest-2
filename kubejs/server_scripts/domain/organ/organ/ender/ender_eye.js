// priority: 500
RegistryOrgan('kubejs:ender_eye')
    .addScore('chestcavity:luck', 1)
    .addScore('chestcavity:nerves', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EnderEyeChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'irons_spellbooks:teleport', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EnderEyeTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'irons_spellbooks:teleport')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ender_eye')
        .addOnlyStrategy('chest_cavity_update', EnderEyeChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', EnderEyeTakeOff)
)
