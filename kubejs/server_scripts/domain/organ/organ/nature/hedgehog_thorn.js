// priority: 500
RegistryOrgan('kubejs:hedgehog_thorn')
    .addScore('chestcavity:defense', 1)
    .addScore('kubejs:extreme_fitness', 1)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function HedgehogThornEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity instanceof $LivingEntity) {
        customData.thornsDamage = customData.thornsDamage + entity.armorValue
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:hedgehog_thorn')
        .addOnlyStrategy('entity_be_hurt', HedgehogThornEntityBeHurt)
)