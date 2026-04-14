// priority: 500
RegistryOrgan('kubejs:sacred_heart')
    .addScore('chestcavity:health', 1.5)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SacredHeartChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'irons_spellbooks:greater_heal', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SacredHeartTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'irons_spellbooks:greater_heal')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sacred_heart')
        .addOnlyStrategy('chest_cavity_update', SacredHeartChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', SacredHeartTakeOff)
)