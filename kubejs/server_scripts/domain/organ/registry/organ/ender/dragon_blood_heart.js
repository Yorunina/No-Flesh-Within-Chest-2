// priority: 500
RegistryOrgan('kubejs:dragon_blood_heart')
    .addScore('chestcavity:health', 2)
    .addScore('kubejs:dragon_blood', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DragonBloodHeartChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:advance_dragon_breath', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DragonBloodHeartTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:advance_dragon_breath')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:dragon_blood_heart')
        .addOnlyStrategy('chest_cavity_update', DragonBloodHeartChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', DragonBloodHeartTakeOff)
)

