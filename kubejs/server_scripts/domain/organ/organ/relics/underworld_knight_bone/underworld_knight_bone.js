// priority: 500
RegistryOrgan('kubejs:underworld_knight_bone')
    .addScore('kubejs:extreme_fitness', 1)
    .addScore('chestcavity:endurance', 1)


/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function UnderworldKnightBoneChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    const chestCavity = event.chestCavity
    let extremeFitness = chestCavity.getOrganScore('kubejs:extreme_fitness') * 0.25
    customData.maxHealth.addAttributeModifier(extremeFitness, 'multiple', 'all')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:underworld_knight_bone')
        .addOnlyStrategy('chest_cavity_update', UnderworldKnightBoneChestCavityUpdate)
)