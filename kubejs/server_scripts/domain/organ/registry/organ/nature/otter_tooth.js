// priority: 500
RegistryOrgan('kubejs:otter_tooth')
    .addScore('chestcavity:strength', 1)
    .addScore('chestcavity:swim_speed', 1)


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
    const player = event.player
    if (event.hand != 'main_hand') return
    if (!event.item.isEmpty()) return
    let resultBlockState = $AxeItem.getAxeStrippingState(block.blockState)
    if (!resultBlockState) return
    block.popItemFromFace(Item.of('productivetrees:sawdust', Math.ceil(Math.random() * 4)), event.facing)
    level.playSound(null, block.pos.getX(), block.pos.getY(), block.pos.getZ(), 'item.axe.strip', $SoundSource.BLOCKS, 1, 1)
    level.setBlockAndUpdate(block.pos, resultBlockState)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:otter_tooth')
        .addOnlyStrategy('block_right_clicked', OtterToothBlockRightClicked)
)
