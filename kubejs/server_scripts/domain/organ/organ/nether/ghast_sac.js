// priority: 500
RegistryOrgan('kubejs:ghast_sac')
    .addScore('chestcavity:speed', 1)
    .addScore('chestcavity:breath_recovery', 1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function GhastSacKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    SummonFireballTowardFacing(player, level)
    player.addItemCooldown(organItem, 20 * 3)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ghast_sac')
        .addOnlyStrategy('key_active', GhastSacKeyActive)
)