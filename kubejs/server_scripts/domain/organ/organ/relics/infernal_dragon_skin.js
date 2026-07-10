// priority: 500
RegistryOrgan('kubejs:infernal_dragon_skin')
    .addScore('chestcavity:strength', -1)
    .addScore('chestcavity:fire_resistant', -1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfernalDragonSkinUpdateChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:advance_burning_dash', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfernalDragonSkinTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:advance_burning_dash')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:infernal_dragon_skin')
        .addOnlyStrategy('chest_cavity_update', InfernalDragonSkinUpdateChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', InfernalDragonSkinTakeOff)
)
