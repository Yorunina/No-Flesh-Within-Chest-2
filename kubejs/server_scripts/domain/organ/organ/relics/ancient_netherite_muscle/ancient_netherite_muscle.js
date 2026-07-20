// priority: 500
RegistryOrgan('kubejs:ancient_netherite_muscle')
    .addScore('kubejs:extreme_strength', 3)
    .addScore('chestcavity:strength', 3)
    .addScore('chestcavity:endurance', -3)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function AncientNetheriteMuscleChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    const chestCavity = event.chestCavity
    let extremeStrength = chestCavity.getOrganScore('kubejs:extreme_strength') * 0.25
    customData.attackDamage.addAttributeModifier(extremeStrength, 'multiple', 'all')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ancient_netherite_muscle')
        .addOnlyStrategy('chest_cavity_update', AncientNetheriteMuscleChestCavityUpdate)
)