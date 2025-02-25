// priority: 3000

/**
 * 
 * @param {Internal.LivingEntity} entity 
 * @returns {Internal.ChestCavityInventory}
 */
function GetEntityChestCavityInventory(entity) {
    return entity.chestCavityInstance.inventory
}

/**
 * 
 * @param {Internal.ChestCavityInstance} cc 
 * @param {Number} index 
 */
function GetChestCavitySlotType(cc, index) {
    return cc.getInventoryTypeData().getSlotType(index)
}


function GetCustomDataOrDefault(customData, key, defaultValue) {
    return customData[key] ? customData[key] : defaultValue
}