// priority: 3000

// /**
//  * 
//  * @param {Internal.ServerPlayer} player 
//  */
// function IsUnderComabt(player) {
//     if (!player.nbt) return false
//     if (!player.nbt.contains('ForgeData')) return false
//     let forgeData = player.nbt.get('ForgeData')
//     if (!forgeData.contains('PlayerPersisted')) return false
//     let playerPersisted = forgeData.get('PlayerPersisted')
//     if (!playerPersisted.contains('out_of_combat')) return false
//     /**@type {Internal.CompoundTag} */
//     let outOfCombat = playerPersisted.get('out_of_combat')
//     return outOfCombat.getInt('outOfCombatTime') == 0
// }

/**
 * 
 * @param {Internal.ServerLevel} level 
 * @param {Internal.ServerPlayer} player 
 * @param {Internal.EntityType} entityType 
 */
function GetMobKillCount(level, player, entityType) {
    let progressionData = GetPlayerProgressionData(level)
    return progressionData.getKillCount(player.uuid, entityType)
}



/**
 * @param {Internal.ServerLevel} level 
 * @returns {Internal.PlayerProgressionData}
 */
function GetPlayerProgressionData(level) {
    return $PlayerProgressionData.getOrCreate(level)
}