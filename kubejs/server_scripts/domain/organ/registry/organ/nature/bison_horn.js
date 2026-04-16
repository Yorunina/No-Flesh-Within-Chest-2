// priority: 500
RegistryOrgan('kubejs:bison_horn')
    .addScore('kubejs:extreme_strength', 2)
    .addScore('chestcavity:defense', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BisonHornEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.isCrouching()) {
        event.amount = event.amount * 1.2
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:bison_horn')
        .addOnlyStrategy('entity_do_damage', BisonHornEntityDoDamage)
)

