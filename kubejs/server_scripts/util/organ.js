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
    const chestCavity = target.chestCavityInstance
    chestCavity.customDataMap.put('putridToxinsDamage', damage)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @returns {number}
 */
function GetPutridToxinsDamage(target, damage) {
    const chestCavity = target.chestCavityInstance
    return chestCavity.customDataMap.getOrDefault('putridToxinsDamage', 0)
}



/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {string} uuidString
 */
function SetVitaToxinsSource(target, uuidString) {
    const chestCavity = target.chestCavityInstance
    chestCavity.customDataMap.put('vitaToxinsSource', uuidString)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {string} type
 */
function SetVitaToxinsType(target, type) {
    const chestCavity = target.chestCavityInstance
    chestCavity.customDataMap.put('vitaToxinsType', type)
}

/**
 *
 * @param {Internal.LivingEntity} target
 * @param {number} coe
 */
function SetVitaToxinsCoe(target, coe) {
    const chestCavity = target.chestCavityInstance
    chestCavity.customDataMap.put('vitaToxinsCoe', coe)
}