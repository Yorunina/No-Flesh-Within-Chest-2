// priority: 500
RegistryOrgan('kubejs:elder_guardian_core')
    .addScore('chestcavity:nerves', 1)
    .addScore('chestcavity:luck', 1)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ElderGuardianCoreKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    const server = event.server
    if (level.getDimension() == 'infinity:missingno') {
        player.teleportTo(new ResourceLocation('minecraft:overworld'), player.x, player.y, player.z, player.yaw, player.pitch)
    } else {
        InfinityPortalCreator.addInfinityDimensionIfNotExists(server, new ResourceLocation('infinity:missingno'))
        player.teleportTo(new ResourceLocation('infinity:missingno'), player.x, player.y, player.z, player.yaw, player.pitch)
    }

    player.addItemCooldown(organItem, 20 * 60)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:elder_guardian_core')
        .addOnlyStrategy('key_active', ElderGuardianCoreKeyActive)
)