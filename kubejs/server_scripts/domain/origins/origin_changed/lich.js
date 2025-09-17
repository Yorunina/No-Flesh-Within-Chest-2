// priority: 500
RegistryOriginChangedStrategy('kubejs:lich', LichOriginStrategy)

/**
 * @param {any} customData 
 * @param {Internal.OriginChangedJS} event 
 */
function LichOriginStrategy(customData, event) {
    const player = event.player
    const chestCavity = player.chestCavityInstance
    chestCavity.setInventoryType(new ResourceLocation('kubejs:cc_inventory_types/default.json'))
    let targetItem = chestCavity.inventory.getStackInSlot(13)
    if (!targetItem.isEmpty()) {
        SpawnItemEntityWithMovement(event.level, player.blockPosition(), targetItem, new Vec3d(Math.random() - 0.5, 1, Math.random() - 0.5))
    }
    chestCavity.inventory.setStackInSlot(13, Item.of('kubejs:soul_cage'))
}