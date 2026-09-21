// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function RoseTagChestCavityUpdate(customData, event, tagId, count) {
    if (count < 8) return
    let rosy = event.chestCavity.getOrganScore('kubejs:rosy')
    customData.attackDamage.addAttributeModifier(rosy * 0.03, 'multiple', 'base')
    customData.maxHealth.addAttributeModifier(rosy * 0.03, 'multiple', 'base')
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:rose')
        .addStrategy('chest_cavity_update', RoseTagChestCavityUpdate)
)