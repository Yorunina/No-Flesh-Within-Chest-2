// priority: 3000
/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {number} damage 
 */
function SetPutridToxinsDamage(target, damage) {
    target.persistentData.putFloat('putridToxinsDamage', damage)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @returns {number}
 */
function GetPutridToxinsDamage(target) {
    return target.persistentData.contains('putridToxinsDamage') ? target.persistentData.getFloat('putridToxinsDamage') : 0
}



/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {Internal.UUID} uuid
 */
function SetVitaToxinsSource(target, uuid) {
    target.persistentData.putUUID('vitaToxinsSource', uuid)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @return {Internal.UUID}
 */
function GetVitaToxinsSource(target) {
    return target.persistentData.contains('vitaToxinsSource') ? target.persistentData.getUUID('vitaToxinsSource') : null
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {string} type
 */
function SetVitaToxinsType(target, type) {
    target.persistentData.putString('vitaToxinsType', type)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @returns 
 */
function GetVitaToxinsType(target) {
    return target.persistentData.contains('vitaToxinsType') ? target.persistentData.getString('vitaToxinsType') : 'attack_damage'
}

/**
 *
 * @param {Internal.LivingEntity} target
 * @param {number} coe
 */
function SetVitaToxinsCoe(target, coe) {
    target.persistentData.putFloat('vitaToxinsCoe', coe)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @returns 
 */
function GetVitaToxinsCoe(target) {
    return target.persistentData.contains('vitaToxinsCoe') ? target.persistentData.getFloat('vitaToxinsCoe') : 1
}