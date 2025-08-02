// priority: 500
RegistryOrgan('kubejs:potion_skin')
    .addScore('chestcavity:defense', 3)
    .addScore('kubejs:magic_overload', -1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function CalamityBoneSpurChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    let magicOverloadLevel = FloorAboveZero(chestCavity.getOrganScore('kubejs:magic_overload') / 5)
    AddSpellSelection(customData, chestCavity, 'irons_spellbooks:oakskin', 1 + magicOverloadLevel)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function CalamityBoneSpurTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'irons_spellbooks:oakskin')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:potion_skin')
        .addStrategy('chest_cavity_update', CalamityBoneSpurChestCavityUpdate)
        .addStrategy('organ_take_off', CalamityBoneSpurTakeOff)
)