// priority: 500
RegistryOrgan('kubejs:fox_tail')
    .addScore('chestcavity:strength', 1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function FoxTailKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    const ccIns = player.chestCavityInstance
    player.addDeltaMovement(new Vec3d(0, Math.max(ccIns.getOrganScore('chestcavity:strength'), 1), 0))
    player.connection.send(new $ClientboundSetEntityMotionPacket(player))
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.horse.jump', player.getSoundSource(), 1, 1)
    player.addItemCooldown('kubejs:fox_tail', 20 * 10)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:fox_tail')
        .addOnlyStrategy('key_active', FoxTailKeyActive)
)