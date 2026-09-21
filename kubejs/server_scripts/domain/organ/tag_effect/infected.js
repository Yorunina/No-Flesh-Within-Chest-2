// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function InfectedTagChestCavityUpdate(customData, event, tagId, count) {
    if (count >= 2 && count < 5) {
        customData.maxHealth.addAttributeModifier(-0.5, 'multiple', 'base')
    }
    if (count >= 9) {
        customData.addMaxHealthToAttack = true
    }
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:infected')
        .addStrategy('chest_cavity_update', InfectedTagChestCavityUpdate)
)