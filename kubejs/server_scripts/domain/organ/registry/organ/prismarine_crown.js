// priority: 500
RegistryOrgan('kubejs:prismarine_crown')
    .addScore('chestcavity:water_breath', 1)
    .addScore('chestcavity:swim_speed', 1)


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
    if (event.entity.isPlayer()) {
        AddSpellSelection(customData, chestCavity.customDataMap, 'irons_spellbooks:gust', 1)
        AddClientISSSpellDataDefer(customData, event.entity, organIndex)
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PrismarineCrownTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (entity.isPlayer()) {
        RemoveSpellSelection(customData, chestCavity.customDataMap, 'irons_spellbooks:gust', 1)
        AddClientISSSpellDataDefer(customData, entity, organIndex)
    }
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:prismarine_crown')
        .addOnlyStrategy('chest_cavity_update', PrismarineCrownChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', PrismarineCrownTakeOff)
)