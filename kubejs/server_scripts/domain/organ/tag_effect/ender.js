// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function EnderTagChestCavityUpdate(customData, event, tagId, count) {
    if (count < 6) return
    const chestCavity = event.chestCavity
    chestCavity.setOrganScore('kubejs:attack_dodge', chestCavity.getOrganScore('kubejs:attack_dodge') + 30)
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:ender')
        .addStrategy('chest_cavity_update', EnderTagChestCavityUpdate)
)