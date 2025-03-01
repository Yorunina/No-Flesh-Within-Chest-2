// priority: 500
RegistryOrgan('kubejs:prismarine_crown')
    .addScore('chestcavity:water_breath', 2)
    .addScore('chestcavity:swim_speed', 1)
    .addScore('chestcavity:luck', 1)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PrismarineCrownChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const { chestCavity } = event
    chestCavity.organScores.forEach((key, value) => {
        if (value < 0) {
            chestCavity.setOrganScore(key, 0)
        }
    })
}
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PrismarineCrownSpellSelection(customData, event, organItem, organIndex, slotType) {
    AddSelectionOption(event, customData, 'irons_spellbooks:gust', 1)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:prismarine_crown')
        .addOnlyStrategy('spell_selection', PrismarineCrownSpellSelection)
        .addOnlyStrategy('chest_cavity_update', PrismarineCrownChestCavityUpdate)
)