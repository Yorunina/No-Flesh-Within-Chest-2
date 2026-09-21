// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function MachineTagChestCavityUpdate(customData, event, tagId, count) {
    const chestCavity = event.chestCavity
    if (count >= 3) {
        let nerves = chestCavity.getOrganScore('chestcavity:nerves')
        if (nerves < 1) {
            chestCavity.setOrganScore('chestcavity:nerves', 1)
        }
    }
    if (count >= 6) {
        let health = chestCavity.getOrganScore('chestcavity:health')
        if (health < 1) {
            chestCavity.setOrganScore('chestcavity:health', 1)
        }
    }
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:machine')
        .addStrategy('chest_cavity_update', MachineTagChestCavityUpdate)
)