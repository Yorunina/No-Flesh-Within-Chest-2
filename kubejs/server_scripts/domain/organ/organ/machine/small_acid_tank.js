// priority: 500
RegistryOrgan('kubejs:small_acid_tank')
    .addScore('chestcavity:digestion', -3)
    .addScore('chestcavity:nutrition', -3)
    .addScore('chestcavity:health', -1)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function SmallAcidTankEntityTick(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const entity = event.entity

    let damage = organItem.getDamageValue()
    let maxDamage = organItem.getMaxDamage()

    if (damage + 1 >= maxDamage) {
        RemoveChestCavityOrgan(customData, chestCavity, organIndex, slotType, true)
        if (chestCavity.getInventoryType() == 'kubejs:cc_inventory_types/player_17') {
            chestCavity.setInventoryType('kubejs:cc_inventory_types/player_21')
        }
        return
    }
    if (entity.isMoving()) {
        entity.attack(entity.damageSources().thorns(entity), 1)
    }
    organItem.setDamageValue(damage + 1)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:small_acid_tank')
        .addOnlyStrategy('entity_tick', SmallAcidTankEntityTick)
)