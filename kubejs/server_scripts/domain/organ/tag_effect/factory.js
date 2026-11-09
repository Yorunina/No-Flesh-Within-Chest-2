// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function FactoryTagChestCavityUpdate(customData, event, tagId, count) {
    const chestCavity = event.chestCavity
    if (count >= 4) {
        let breathrecovery = chestCavity.getOrganScore('chestcavity:breath_recovery')
        if (breathrecovery < 2) {
            chestCavity.setOrganScore('chestcavity:breath_recovery', 2)
        }
        let breathcapacity = chestCavity.getOrganScore('chestcavity:breath_capacity')
        if (breathcapacity < 2) {
            chestCavity.setOrganScore('chestcavity:breath_capacity', 2)
        }
    }
    if (count >= 8) {
        let filtration = chestCavity.getOrganScore('chestcavity:filtration')
        if (filtration < 2) {
            chestCavity.setOrganScore('chestcavity:filtration', 2)
        }
    }
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:factory')
        .addStrategy('chest_cavity_update', FactoryTagChestCavityUpdate)
)