// priority: 500
RegistryOrgan('kubejs:red_panda_tail')
    .addScore('chestcavity:speed', 1)
    .addScore('chestcavity:endurance', 0.5)
    .setCanSpawn(true)
    
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RedPandaTailEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    const blockPos = entity.blockPosition()
    if (!level.isEmptyBlock(blockPos)) return
    let feetBlock = level.getBlock(blockPos.getX(), blockPos.getY() - 1, blockPos.getZ())
    let feetBlockState = feetBlock.getBlockState()
    if (!feetBlockState) return
    let berryBush = 'minecraft:sweet_berry_bush'
    // let berryBush = 'ars_nouveau:sourceberry_bush'
    let canPlant = feetBlockState.block.canSustainPlant(feetBlockState, level, blockPos, Direction.DOWN, Block.getBlock(berryBush))
    if (!canPlant) return
    level.setBlockAndUpdate(blockPos, Block.getBlock(berryBush).defaultBlockState())
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:red_panda_tail')
        .addOnlyStrategy('entity_tick', RedPandaTailEntityTick)
)

