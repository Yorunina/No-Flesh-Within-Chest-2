// priority: 500
RegistryOrgan('kubejs:camel_hump')
    .addScore('chestcavity:endurance', 2)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingFallEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function CamelHumpEntityFall(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (event.distance < 3) return
    let curBlockPos = entity.blockPosition()
    let belowBlockPos = curBlockPos.below()
    const level = entity.level
    let belowBlockState = level.getBlockState(belowBlockPos)
    if (belowBlockState.isAir()) return
    level.setBlockAndUpdate(curBlockPos, Blocks.WATER.defaultBlockState())
    event.cancel()
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function CamelHumpKeyActive(customData, event, organItem, organIndex, slotType) {
    const level = event.level
    const player = event.player
    if (OrganItemCoolDown(player, organItem)) return
    let curBlockPos = player.blockPosition()
    level.setBlockAndUpdate(curBlockPos, Blocks.WATER.defaultBlockState())
    player.addItemCooldown('kubejs:camel_hump', 20 * 3)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:camel_hump')
        .addOnlyStrategy('entity_fall', CamelHumpEntityFall)
        .addOnlyStrategy('key_active', CamelHumpKeyActive)
)