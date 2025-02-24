// priority: 500
RegistryOrgan('kubejs:prismarine_crown')
    .addScore('chestcavity:water_breath', 2)
    .addScore('chestcavity:swim_speed', 1)
    .addScore('chestcavity:luck', 1)


/**
 * @param {any} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PrismarineCrownChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const { chestCavity } = event
    chestCavity.organScores.forEach((key, value) => {
        if (value < 0) {
            chestCavity.setOrganScores(key, 0)
        }
    })
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:prismarine_crown')
        .addStrategy('chest_cavity_update', PrismarineCrownChestCavityUpdate)
)