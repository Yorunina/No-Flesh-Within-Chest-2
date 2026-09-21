// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function RevolutionTagChestCavityUpdate(customData, event, tagId, count) {
    const chestCavity = event.chestCavity
    if (count >= 3) {
        let strength = chestCavity.getOrganScore('chestcavity:strength')
        chestCavity.setOrganScore('kubejs:crit_damage', chestCavity.getOrganScore('kubejs:crit_damage') + strength)
    }
    if (count >= 6) {
        let defense = chestCavity.getOrganScore('chestcavity:defense')
        chestCavity.setOrganScore('kubejs:crit_chance', chestCavity.getOrganScore('kubejs:crit_chance') + defense)
    }
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:revolution')
        .addStrategy('chest_cavity_update', RevolutionTagChestCavityUpdate)
)