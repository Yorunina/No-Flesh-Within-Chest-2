// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function RelicsTagChestCavityUpdate(customData, event, tagId, count) {
    if (count >= 10) {
        customData.attackDamage.addAttributeModifier(0.5, 'multiple', 'base')
        customData.maxHealth.addAttributeModifier(0.5, 'multiple', 'base')
        return
    }
    if (count >= 4) {
        customData.attackDamage.addAttributeModifier(-0.5, 'multiple', 'base')
    }
    if (count >= 5) {
        customData.maxHealth.addAttributeModifier(-0.5, 'multiple', 'base')
    }
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:relics')
        .addStrategy('chest_cavity_update', RelicsTagChestCavityUpdate)
)