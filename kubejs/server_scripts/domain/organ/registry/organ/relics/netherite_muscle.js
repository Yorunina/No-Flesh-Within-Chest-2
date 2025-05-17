// priority: 500
RegistryOrgan('kubejs:netherite_muscle')
    .addScore('kubejs:extreme_fitness', -1)
    .addScore('chestcavity:digestion', -1)

// todo 没做完
/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function NetheriteMuscleDoDamage(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    event.amount = event.amount + (entity.maxHealth - entity.health) * 2
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:netherite_muscle')
        .addStrategy('entity_do_damage', NetheriteMuscleDoDamage)
)