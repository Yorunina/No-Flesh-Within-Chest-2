// priority: 3000
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
 * @returns 
 */
function GetVitaToxinsType(target) {
    return target.getPersistentData().contains('vitaToxinsType') ? target.getPersistentData().getString('vitaToxinsType') : 'attack_damage'
}

/**
 *
 * @param {Internal.LivingEntity} target
 * @param {number} coe
 */
function SetVitaToxinsCoe(target, coe) {
    target.getPersistentData().putFloat('vitaToxinsCoe', coe)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @returns 
 */
function GetVitaToxinsCoe(target) {
    return target.getPersistentData().contains('vitaToxinsCoe') ? target.getPersistentData().getFloat('vitaToxinsCoe') : 1
}