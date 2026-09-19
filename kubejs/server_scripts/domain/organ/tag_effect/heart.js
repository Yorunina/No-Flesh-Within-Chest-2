// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function HeartTagChestCavityUpdate(customData, event, tagId, count) {
    if (count >= 6) {
        customData.maxHealth.addAttributeModifier(30, 'addition', 'base')
    } else if (count >= 3) {
        customData.maxHealth.addAttributeModifier(10, 'addition', 'base')
    }
    if (count >= 9) {
        customData.maxHealth.addAttributeModifier(1, 'multiple', 'base')
    }
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:heart')
        .addStrategy('chest_cavity_update', HeartTagChestCavityUpdate)
)
