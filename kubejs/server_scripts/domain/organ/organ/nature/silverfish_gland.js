// priority: 500
RegistryOrgan('kubejs:silverfish_gland')
    .addScore('chestcavity:climbing', 0.5)
    .addScore('chestcavity:metabolism', 0.5)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.BlockRightClickedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SilverfishGlandBlockRightClicked(customData, event, organItem, organIndex, slotType) {
    const block = event.block
    const level = event.level
    const player = event.player
    if (event.hand != 'main_hand') return
    if (!player.mainHandItem.isEmpty()) return
    const state = block.getBlockState()
    if (!$InfestedBlock.isCompatibleHostBlock(state)) return
    level.setBlockAndUpdate(block.getPos(), $InfestedBlock.infestedStateByHost(state))
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:silverfish_gland')
        .addOnlyStrategy('block_right_clicked', SilverfishGlandBlockRightClicked)
)