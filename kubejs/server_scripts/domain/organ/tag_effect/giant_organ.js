// priority: 500
function GiantOrganTagChestCavityUpdate(customData, event, tagId, count) {
    if (count >= 3) customData.maxHealth.addAttributeModifier(-0.25, 'multiple', 'all')
    if (count >= 6) customData.maxHealth.addAttributeModifier(-0.25, 'multiple', 'all')
    if (count >= 9) customData.maxHealth.addAttributeModifier(-0.50, 'multiple', 'all')
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:giant_organ')
        .addStrategy('chest_cavity_update', GiantOrganTagChestCavityUpdate)
)
