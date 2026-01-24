// priority: 500
RegistryOrgan('kubejs:villager_own_you')
    .addScore('chestcavity:luck', 1)

/**
 * @param {AirdropDeathEventCustomData} customData 
 * @param {Internal.LivingEntityDeathEventJS} event 
 */
function VillagerAirdropStrategy(customData, event) {
    let lootList = Utils.rollChestLoot('minecraft:chests/village/village_weaponsmith')
    // todo
    customData.lootList = customData.lootList.concat(lootList)
}
RegistryAirDropDeathStrategy('villager', VillagerAirdropStrategy)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function VillagerOwnYouChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    /**@type {Map<string, WeightRandomItem[]>} */
    let koiFishPool = GetCustomDataMap(entity.chestCavityInstance, 'koiFishPool', new Map())
    koiFishPool.set('villager', [new WeightRandomItem('villager', 10)])
    SetCustomDataMap(entity.chestCavityInstance, 'koiFishPool', koiFishPool)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function VillagerOwnYouChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    /**@type {Map<string, WeightRandomItem[]>} */
    let koiFishPool = GetCustomDataMap(entity.chestCavityInstance, 'koiFishPool', new Map())
    koiFishPool.delete('villager')
    SetCustomDataMap(entity.chestCavityInstance, 'koiFishPool', koiFishPool)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:villager_own_you')
        .addOnlyStrategy('organ_take_on', VillagerOwnYouChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', VillagerOwnYouChestCavityTakeOff)
)

