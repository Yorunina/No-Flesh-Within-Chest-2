// priority: 500
RegistryOrgan('kubejs:demon_eyeball')
    .addScore('kubejs:extreme_strength', 1)
    .addScore('chestcavity:defense', -2)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DemonEyeballDoDamage(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    event.amount = event.amount * (entity.pitch + 90) / 90
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:demon_eyeball')
        .addOnlyStrategy('entity_do_damage', DemonEyeballDoDamage)
)