// priority: 1000

/**
 * 
 * @param {Internal.LivingEntity} entity 
 * @returns {Internal.ChestCavityInventory}
 */
function GetEntityChestCavityInventory(entity) {
    return entity.chestCavityInstance.inventory
}