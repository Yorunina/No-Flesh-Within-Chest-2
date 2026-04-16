// priority: 500
RegistryOrgan('kubejs:ferret_tail')
    .addScore('chestcavity:nerves', 0.25)
    .addScore('chestcavity:speed', 1)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function FerretTailChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    chestCavity.setOrganScore('chestcavity:speed', 1)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ferret_tail')
        .addOnlyStrategy('chest_cavity_update', FerretTailChestCavityUpdate, 1)
)