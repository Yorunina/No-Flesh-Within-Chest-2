// priority: 500
RegistryOrgan('kubejs:immortal_volcanic_rock')
    .addScore('chestcavity:strength', -1)
    .addScore('chestcavity:endurance', -1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ImmortalVolcanicRockChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    SetCustomDataMap(entity.chestCavityInstance, 'volcanicRockFire', 1)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ImmortalVolcanicRockChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    RemoveCustomDataMap(entity.chestCavityInstance, 'volcanicRockFire')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:immortal_volcanic_rock')
       .addOnlyStrategy('organ_take_on', ImmortalVolcanicRockChestCavityTakeOn)
       .addOnlyStrategy('organ_take_off', ImmortalVolcanicRockChestCavityTakeOff)
)


/**
 * 判断是否单位处于着火状态
 * @param {Internal.LivingEntity} entity 
 * @returns 
 */
function IsEntityOnFire(entity) {
    return entity.isOnFire() || GetCustomDataMap(entity.chestCavityInstance, 'volcanicRockFire', 0) == 1
}