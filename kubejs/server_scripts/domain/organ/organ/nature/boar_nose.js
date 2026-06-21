// priority: 500
RegistryOrgan('kubejs:boar_nose')
    .addScore('chestcavity:endurance', 2)
    .setCanSpawn(true)

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
    const level = event.level
    if (event.hand != 'main_hand' || !player.getMainHandItem().isEmpty()) return
    if (block.id == 'minecraft:grass_block') {
        level.setBlockAndUpdate(block.getPos(), Blocks.DIRT.defaultBlockState())
        RecoverPlayerHungerAndSaturation(player, 2)
        player.swing()
        level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.burp', player.getSoundSource(), 1, 1)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:boar_nose')
        .addOnlyStrategy('block_right_clicked', BoarNoseBlockRightClicked)
)