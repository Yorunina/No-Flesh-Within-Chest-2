// priority: 500
RegistryOrgan('kubejs:boar_nose')
    .addScore('chestcavity:endurance', 2)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.BlockRightClickedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BoarNoseBlockRightClicked(customData, event, organItem, organIndex, slotType) {
    const block = event.block
    const player = event.player
    if (!block.hasTag('minecraft:dirt')) return
    let luckRandom = RandomWithPlayerLuck(player)
    event.level.setBlockAndUpdate(block.getPos(), Blocks.SAND.defaultBlockState())
    if (luckRandom <= 0.8) return
    block.popItemFromFace('wildernature:truffle', event.facing)
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:boar_nose')
        .addOnlyStrategy('block_right_clicked', BoarNoseBlockRightClicked)
)