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
    const player = event.player
    if (OrganItemCoolDown(player, organItem)) return
    if (!item.is('minecraft:iron_ingot')) return
    player.heal(player.getMaxHealth() * 0.1)
    RecoverPlayerHungerAndSaturation(player, 4)
    item.shrink(1)
    player.addItemCooldown(organItem, 20 * 3)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:iron_repair_device')
        .addOnlyStrategy('item_right_clicked', IronRepairDeviceItemRightClicked)
)