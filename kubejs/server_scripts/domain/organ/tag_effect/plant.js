// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function PlantTagChestCavityUpdate(customData, event, tagId, count) {
    const chestCavity = event.chestCavity
    if (count >= 9) {
        chestCavity.setOrganScore('kubejs:photosynthesis', chestCavity.getOrganScore('kubejs:photosynthesis') + count)
    }
    let photosynthesis = chestCavity.getOrganScore('kubejs:photosynthesis')
    if (count >= 3) {
        customData.attackDamage.addAttributeModifier(photosynthesis * 0.03, 'multiple', 'base')
    }
    if (count >= 6) {
        customData.maxHealth.addAttributeModifier(photosynthesis * 0.03, 'multiple', 'base')
    }
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:plant')
        .addStrategy('chest_cavity_update', PlantTagChestCavityUpdate)
)