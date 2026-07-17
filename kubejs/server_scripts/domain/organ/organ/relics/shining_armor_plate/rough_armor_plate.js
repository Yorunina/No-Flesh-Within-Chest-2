// priority: 500
RegistryOrgan('kubejs:rough_armor_plate')
    .addScore('chestcavity:defense', 1)
    .addScore('chestcavity:nerves', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoughArmorPlateChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:ascension', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoughArmorPlateTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:ascension')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rough_armor_plate')
        .addOnlyStrategy('chest_cavity_update', RoughArmorPlateChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', RoughArmorPlateTakeOff)
)

