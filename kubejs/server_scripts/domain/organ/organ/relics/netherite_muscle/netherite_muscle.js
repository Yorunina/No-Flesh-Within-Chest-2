// priority: 500
RegistryOrgan('kubejs:netherite_muscle')
    .addScore('kubejs:extreme_strength', 4)
    .addScore('chestcavity:strength', 4)
    .addScore('chestcavity:endurance', -4)


/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function NetheriteMuscleChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    const chestCavity = event.chestCavity
    let extremeStrength = chestCavity.getOrganScore('kubejs:extreme_strength') * 0.25
    customData.attackDamage.addAttributeModifier(extremeStrength, 'multiple', 'all')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:netherite_muscle')
        .addOnlyStrategy('chest_cavity_update', NetheriteMuscleChestCavityUpdate)
)