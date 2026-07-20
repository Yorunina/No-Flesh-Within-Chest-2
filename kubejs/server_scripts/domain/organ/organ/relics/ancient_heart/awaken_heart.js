// priority: 500
RegistryOrgan('kubejs:awaken_heart')
    .addScore('chestcavity:detoxification', 1)
    .addScore('chestcavity:health', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AwakenHeartChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:raise_hell', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AwakenHeartOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:raise_hell')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:awaken_heart')
        .addOnlyStrategy('chest_cavity_update', AwakenHeartChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', AwakenHeartOrganTakeOff)
)