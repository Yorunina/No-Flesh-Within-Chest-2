// priority: 500
RegistryOrgan('kubejs:kraken_eye')
    .addScore('chestcavity:nutrition', 1)
    .addScore('chestcavity:digestion', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function KrakenEyeChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:real_black_hole', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function KrakenEyeTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:real_black_hole')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:kraken_eye')
        .addOnlyStrategy('chest_cavity_update', KrakenEyeChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', KrakenEyeTakeOff)
)