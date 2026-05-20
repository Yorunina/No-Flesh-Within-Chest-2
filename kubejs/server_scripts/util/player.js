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
 * 是否为完全充能的攻击
 * @param {Internal.ServerPlayer} player 
 */
function IsFullChargeAttck(player) {
    return player.getAttackStrengthScale(0) < 0.9
}

/**
 * 
 * @param {Internal.ServerPlayer} player 
 * @returns {number}
 */
function RecoverPlayerHungerAndSaturation(player, amount) {
    let foodData = player.getFoodData()
    let needFood = 20 - foodData.getFoodLevel()
    if (needFood > amount) {
        foodData.setFoodLevel(Math.floor(foodData.getFoodLevel() + amount))
        return 0
    }
    amount = amount - needFood
    foodData.setFoodLevel(20)
    let needSaturation = 20 - foodData.getSaturationLevel()
    if (needSaturation > amount) {
        foodData.setSaturation(Math.floor(foodData.getSaturationLevel() + amount))
        return 0
    }
    foodData.setSaturation(20)
    return amount - needSaturation
}

/**
 * 
 * @param {Internal.ServerPlayer} player 
 * @param {Internal.ItemStack[]} itemList 
 */
function GivePlayerItemList(player, itemList) {
    for (let item of itemList) {
        player.give(item)
    }
}