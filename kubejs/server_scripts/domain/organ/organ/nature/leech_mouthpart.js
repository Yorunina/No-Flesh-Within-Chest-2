// priority: 500
RegistryOrgan('kubejs:leech_mouthpart')
    .addScore('kubejs:extreme_strength', 1)
    .addScore('chestcavity:digestion', 1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function LeechMouthpartEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.isPlayer() && RandomWithPlayerLuck(entity) < 0.5) {
        let foodData = entity.getFoodData()
        foodData.setSaturation(Math.min(foodData.getSaturationLevel() + 1, 20))
    } else if (entity.getHealth() < entity.getMaxHealth()) {
        entity.heal(1)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:leech_mouthpart')
        .addOnlyStrategy('entity_do_damage', LeechMouthpartEntityDoDamage)
)