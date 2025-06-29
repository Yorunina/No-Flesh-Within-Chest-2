// priority: 500
/**
 * @param {AirdropDeathEventCustomData} customData 
 * @param {Internal.LivingEntityDeathEventJS} event 
 */
function AncientCityAirdropStrategy(customData, event) {
    let lootList = Utils.rollChestLoot('minecraft:chests/ancient_city')
    customData.lootList = customData.lootList.concat(lootList)
}

/**
 * @param {AirdropDeathEventCustomData} customData 
 * @param {Internal.LivingEntityDeathEventJS} event 
 */
function EndCityAirdropStrategy(customData, event) {
    let lootList = Utils.rollChestLoot('minecraft:chests/end_city_treasure')
    customData.lootList = customData.lootList.concat(lootList)
}


RegisterAirDropDeathStrategy('end_city_treasure', EndCityAirdropStrategy)
RegisterAirDropDeathStrategy('ancient_city', AncientCityAirdropStrategy)