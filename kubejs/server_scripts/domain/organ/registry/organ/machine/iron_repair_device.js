// priority: 500
RegistryOrgan('kubejs:iron_repair_device')
    .addScore('chestcavity:fire_resistant', -2)
    .addScore('chestcavity:defense', -1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ItemClickedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function IronRepairDeviceItemRightClicked(customData, event, organItem, organIndex, slotType) {
    const item = event.item
    if (!item.is('minecraft:iron_ingot')) return
    const player = event.player
    player.heal(player.getMaxHealth() * 0.1)
    RecoverPlayerHungerAndSaturation(player, 4)
    item.shrink(1)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:iron_repair_device')
        .addOnlyStrategy('item_right_clicked', IronRepairDeviceItemRightClicked)
)