// priority: 500
RegistryOrgan('kubejs:chop_rib')
    .addScore('chestcavity:defense', 0.5)
    .addScore('chestcavity:strength', 1)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.BlockBrokenEventJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ChopRibBlockBrokenStrategy(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    const block = event.block
    MAAUtils.tryToChopTree(level, entity.blockPosition(), block.pos, block.getBlockState())
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:chop_rib')
        .addOnlyStrategy('block_broken', ChopRibBlockBrokenStrategy)
)