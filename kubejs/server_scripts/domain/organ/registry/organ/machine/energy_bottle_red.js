// priority: 500
RegistryOrgan('kubejs:energy_bottle_red')
    .addScore('chestcavity:nerves', -0.5)
    .addScore('chestcavity:strength', 1.5)



/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EnergyBottleRedEntityTick(customData, event, organItem, organIndex, slotType) {
    let repairValue = 1
    switch (slotType) {
        case MachinaryLubricant:
            repairValue = repairValue * 4
            break
        default:
            break
    }
    if (organItem.getDamageValue() > 0) {
        organItem.setDamageValue(Math.max(organItem.getDamageValue() - repairValue, 0))
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

    if (chestCavity.inventory.find('kubejs:burning_heart') > -1) {
        switch (slotType) {
            case RevolutionFlame:
                if (organItem.getDamageValue() + 10 <= organItem.getMaxDamage()) {
                    let damageRate = FloorFix((organItem.getMaxDamage() - organItem.getDamageValue()) / organItem.getMaxDamage(), 2)
                    let value = GetCustomDataOrDefault(customData, 'burningItemMultiplierBoost', 0)
                    SetCustomData(customData, 'burningItemMultiplierBoost', value + damageRate * 2)
                    organItem.setDamageValue(organItem.getDamageValue() + 10)
                }
                break
            case MachinaryLubricant:
                if (organItem.getDamageValue() + 10 <= organItem.getMaxDamage()) {
                    let damageValue = organItem.getMaxDamage() - organItem.getDamageValue()
                    let value = GetCustomDataOrDefault(customData, 'burningItemDamageBoost', 0)
                    SetCustomData(customData, 'burningItemDamageBoost', value + damageValue * 4)
                    organItem.setDamageValue(organItem.getDamageValue() + 10)
                }
                break
            default:
                if (organItem.getDamageValue() + 10 <= organItem.getMaxDamage()) {
                    let damageValue = organItem.getMaxDamage() - organItem.getDamageValue()
                    let value = GetCustomDataOrDefault(customData, 'burningItemDamageBoost', 0)
                    SetCustomData(customData, 'burningItemDamageBoost', value + damageValue)
                    organItem.setDamageValue(organItem.getDamageValue() + 10)
                }
                break
        }

    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:energy_bottle_red')
        .addStrategy('entity_tick', EnergyBottleRedEntityTick)
        .addStrategy('entity_do_damage', EnergyBottleRedDoDamage)
)