// priority: 500
RegistryOrgan('kubejs:sturdy_harbinger_lung')
    .addScore('chestcavity:breath_capacity', 1)
    .addScore('chestcavity:breath_recovery', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SturdyHarbingerLungChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:flaming_strike', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SturdyHarbingerLungTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:flaming_strike')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sturdy_harbinger_lung')
        .addOnlyStrategy('chest_cavity_update', SturdyHarbingerLungChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', SturdyHarbingerLungTakeOff)
)