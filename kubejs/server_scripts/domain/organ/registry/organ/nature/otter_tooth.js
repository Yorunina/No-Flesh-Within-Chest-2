// priority: 500
ServerEvents.recipes(event => {
    $AxeItem.STRIPPABLES.put(Block.getBlock('ars_nouveau:blue_archwood_log'), Block.getBlock('ars_nouveau:stripped_blue_archwood_log'))
    $AxeItem.STRIPPABLES.put(Block.getBlock('ars_nouveau:red_archwood_log'), Block.getBlock('ars_nouveau:stripped_red_archwood_log'))
    $AxeItem.STRIPPABLES.put(Block.getBlock('ars_nouveau:purple_archwood_log'), Block.getBlock('ars_nouveau:stripped_purple_archwood_log'))
    $AxeItem.STRIPPABLES.put(Block.getBlock('ars_nouveau:green_archwood_log'), Block.getBlock('ars_nouveau:stripped_green_archwood_log'))
})
RegistryOrgan('kubejs:otter_tooth')
    .addScore('chestcavity:strength', 1)
    .addScore('chestcavity:swim_speed', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.BlockRightClickedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function OtterToothBlockRightClicked(customData, event, organItem, organIndex, slotType) {
    const level = event.level
    const block = event.block
    if (event.hand != 'main_hand') return
    if (!event.item.isEmpty()) return
    let resultBlockState = $AxeItem.getAxeStrippingState(block.blockState)
    if (!resultBlockState) return
    block.popItemFromFace(Item.of('kubejs:sawdust', Math.ceil(Math.random() * 4)), event.facing)
    level.playSound(null, block.pos.getX(), block.pos.getY(), block.pos.getZ(), 'item.axe.strip', $SoundSource.BLOCKS, 1, 1)
    level.setBlockAndUpdate(block.pos, resultBlockState)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:otter_tooth')
        .addOnlyStrategy('block_right_clicked', OtterToothBlockRightClicked)
)