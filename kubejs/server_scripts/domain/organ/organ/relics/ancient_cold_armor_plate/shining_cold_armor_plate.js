// priority: 500
RegistryOrgan('kubejs:shining_cold_armor_plate')
    .addScore('chestcavity:defense', 2)
    .addScore('chestcavity:nerves', 2)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ShiningColdArmorPlateChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:shockwave', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ShiningColdArmorPlateTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:shockwave')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ancient_cold_armor_plate')
        .addOnlyStrategy('chest_cavity_update', ShiningColdArmorPlateChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', ShiningColdArmorPlateTakeOff)
)