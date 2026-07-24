// priority: 500
RegistryOrgan('kubejs:roly_poly_shell')
    .addScore('chestcavity:defense', 1)
    .addScore('chestcavity:breath_capacity', -1)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RolyPolyShellKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    let enderChestContainer = player.getEnderChestInventory()
    player.openMenu(new $SimpleMenuProvider((pContainerId, pPlayerInventory, pPlayer) => {
        return $ChestMenu.threeRows(pContainerId, pPlayerInventory, enderChestContainer)
    }, Text.translatable('container.enderchest')))
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:roly_poly_shell')
        .addOnlyStrategy('key_active', RolyPolyShellKeyActive)
)