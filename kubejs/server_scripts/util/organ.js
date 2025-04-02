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
    if (!customData[key]) {
        customData[key] = defaultValue
    }
    return customData[key]
}

function SetCustomData(customData, key, value) {
    customData[key] = value
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {number} damage 
 */
function SetPutridToxinsDamage(target, damage) {
    target.getPersistentData().putFloat('putridToxinsDamage', damage)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @returns {number}
 */
function GetPutridToxinsDamage(target) {
    return target.getPersistentData().contains('putridToxinsDamage') ? target.getPersistentData().getFloat('putridToxinsDamage') : 0
}



/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {Internal.UUID} uuid
 */
function SetVitaToxinsSource(target, uuid) {
    target.getPersistentData().putUUID('vitaToxinsSource', uuid)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @return {Internal.UUID}
 */
function GetVitaToxinsSource(target) {
    return target.getPersistentData().contains('vitaToxinsSource') ? target.getPersistentData().getUUID('vitaToxinsSource') : null
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {string} type
 */
function SetVitaToxinsType(target, type) {
    target.getPersistentData().putString('vitaToxinsType', type)
}

/**
 *
 * @param {Internal.LivingEntity} target
 * @param {number} coe
 */
function SetVitaToxinsCoe(target, coe) {
    target.getPersistentData().putFloat('vitaToxinsCoe', coe)
}