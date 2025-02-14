// priority: 500
RegistryOrgan('kubejs:prismarine_crown')
    .addScore('chestcavity:water_breath', 2)
    .addScore('chestcavity:swim_speed', 1)
    .addScore('chestcavity:luck', 1)


OrganChestCavityUpdateStrategy.addOnlyStrategy('kubejs:prismarine_crown', PrismarineCrownChestCavityUpdate)

/**
 * @param {any} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function PrismarineCrownChestCavityUpdate(customData, event, organItem, organIndex) {
    const {  chestCavity } = event
    chestCavity.organScores.forEach((key, value) => {
        if (value < 10) {
            chestCavity.organScores.put(key, new $Float(10))
        }
    })
}


/**
 * 
 */