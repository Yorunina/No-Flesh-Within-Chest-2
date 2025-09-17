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

/**
 * @param {AirdropDeathEventCustomData} customData 
 * @param {Internal.LivingEntityDeathEventJS} event 
 */
function VillagerAirdropStrategy(customData, event) {
    let lootList = Utils.rollChestLoot('minecraft:chests/village/village_weaponsmith')
    // todo
    customData.lootList = customData.lootList.concat(lootList)
}

RegistryAirDropDeathStrategy('end_city_treasure', EndCityAirdropStrategy)
RegistryAirDropDeathStrategy('ancient_city', AncientCityAirdropStrategy)
RegistryAirDropDeathStrategy('villager', VillagerAirdropStrategy)