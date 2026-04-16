// priority: 500
RegistryOrgan('kubejs:penguin_flipper')
    .addScore('chestcavity:swim_speed', 1)
    .setCanSpawn(true)
    
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PenguinFlipperEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    let feetBlockPos = entity.blockPosition().below()
    let feetBlockState = level.getBlockState(feetBlockPos)
    if (!feetBlockState.isAir()) return
    level.setBlockAndUpdate(feetBlockPos, Blocks.FROSTED_ICE.defaultBlockState())
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:penguin_flipper')
        .addOnlyStrategy('entity_tick', PenguinFlipperEntityTick)
)
