// priority: 500
RegistryOrgan('kubejs:energy_bottle_red')
    .addScore('chestcavity:metabolism', 1)



/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EnergyBottleRedEntityTick(customData, event, organItem, organIndex, slotType) {
    if (organItem.getDamageValue() > 0) {
        organItem.setDamageValue(organItem.getDamageValue() - 1)
    }
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EnergyBottleRedDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const chestCavity = sourceEntity.chestCavityInstance

    if (chestCavity.customEntityDataMap.getOrDefault('isBurningHeart', false)) {
        if (organItem.getDamageValue() + 10 <= organItem.getMaxDamage()) {
            let value = GetCustomDataOrDefault(customData, 'burningItemDamageBoost', 0)
            SetCustomData(customData, 'burningItemDamageBoost', value + organItem.getMaxDamage() - organItem.getDamageValue())
            organItem.setDamageValue(organItem.getDamageValue() + 10)
        }
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:energy_bottle_red')
        .addStrategy('entity_tick', EnergyBottleRedEntityTick)
        .addStrategy('entity_do_damage', EnergyBottleRedDoDamage)
)