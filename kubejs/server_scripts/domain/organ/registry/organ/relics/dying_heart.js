// priority: 500
RegistryOrgan('kubejs:dying_heart')
    .addScore('chestcavity:health', 0.5)
    .addScore('kubejs:magic_overload', 2)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DyingHeartChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    let magicOverloadLevel = FloorAboveZero(chestCavity.getOrganScore('kubejs:magic_overload'))
    AddSpellSelection(customData, chestCavity, 'kubejs:raise_overlord_undead', 1 + magicOverloadLevel)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DyingHeartTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:raise_overlord_undead')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:dying_heart')
        .addOnlyStrategy('chest_cavity_update', DyingHeartChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', DyingHeartTakeOff)
)