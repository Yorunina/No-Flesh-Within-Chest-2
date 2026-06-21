// priority: 500
RegistryOrgan('kubejs:wither_skull')
    .addScore('chestcavity:health', -0.5)
    .addScore('kubejs:magic_capacity', 2)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function WithitherSkullChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:advance_wither_skull', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function WithitherSkullTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:advance_wither_skull')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:wither_skull')
        .addOnlyStrategy('chest_cavity_update', WithitherSkullChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', WithitherSkullTakeOff)
)


