// priority: 500
RegistryOrgan('kubejs:squirrel_tail')
    .addScore('kubejs:extreme_strength', -1)
    .addScore('chestcavity:digestion', 2)
    .setCanSpawn(true)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SquirrelTailChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const inventory = chestCavity.inventory
    let allItemCount = 0

    inventory.allItems.forEach(item => {
        allItemCount += item.count
    })

    customData.attackDamage.addAttributeModifier(allItemCount * 0.1, 'addition', 'base')
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:squirrel_tail')
        .addOnlyStrategy('chest_cavity_update', SquirrelTailChestCavityUpdate)
)