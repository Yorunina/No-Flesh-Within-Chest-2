// priority: 500
RegistryOrgan('kubejs:necromancer_skull')
    .addScore('chestcavity:nerves', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function NecromancerSkullChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'irons_spellbooks:raise_dead', 6)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function NecromancerSkullTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'irons_spellbooks:raise_dead')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:necromancer_skull')
        .addOnlyStrategy('chest_cavity_update', NecromancerSkullChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', NecromancerSkullTakeOff)
)