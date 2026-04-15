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
 * 不结算持续的火焰伤害以及不显示火焰渲染
 * @param {Internal.ServerPlayer} player 
 */
function SetPlayerNoFireDamage(player) {
    player.setNoFireDamage(true)
    let data = new $CompoundTag()
    data.putBoolean('noFireRender', true)
    player.sendData('fire_render', data)
}


/**
 * 
 * @param {Internal.ServerPlayer} player 
 * @returns 
 */
function RecoverPlayerHungerAndSaturation(player, amount) {
    let foodData = player.getFoodData()
    let needFood = 20 - foodData.getFoodLevel()
    if (needFood > amount) {
        foodData.setFoodLevel(Math.floor(foodData.getFoodLevel() + amount))
        return
    }
    amount = amount - needFood
    foodData.setFoodLevel(20)
    let needSaturation = 20 - foodData.getSaturationLevel()
    if (needSaturation > amount) {
        foodData.setSaturation(Math.floor(foodData.getSaturationLevel() + amount))
        return
    }
    foodData.setSaturation(20)
}