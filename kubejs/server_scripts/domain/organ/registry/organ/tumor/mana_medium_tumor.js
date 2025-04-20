// priority: 500
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ManaMediumTumorChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    let nbt = organItem.getOrCreateTag()
    let spellId = nbt.getString('spellId')
    let spellLvl = nbt.getInt('spellLvl')
    AddSpellSelection(customData, chestCavity, spellId, spellLvl)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ManaMediumTumorTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    let nbt = organItem.getOrCreateTag()
    let spellId = nbt.getString('spellId')
    let spellLvl = nbt.getInt('spellLvl')
    RemoveSpellSelection(customData, chestCavity, spellId, spellLvl)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:mana_medium_tumor')
        .addStrategy('chest_cavity_update', ManaMediumTumorChestCavityUpdate)
        .addStrategy('organ_take_off', ManaMediumTumorTakeOff)
)