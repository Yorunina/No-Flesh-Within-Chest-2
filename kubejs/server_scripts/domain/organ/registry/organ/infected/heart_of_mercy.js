// priority: 500
RegistryOrgan('kubejs:heart_of_mercy')
    .addScore('chestcavity:health', 1)
    .addScore('chestcavity:defense', -1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function HeartOfMercyEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    const target = event.entity
    if (!(target instanceof $LivingEntity)) return
    if (target.hasEffect('chestcavity:surgical_anesthesia')) return
    if (event.amount < target.getHealth() + target.getAbsorptionAmount() - 10) return
    event.amount = target.getHealth() + target.getAbsorptionAmount() - 10
    target.potionEffects.add('chestcavity:surgical_anesthesia', 20 * 30, 0, false, false)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:heart_of_mercy')
        .addOnlyStrategy('entity_do_damage', HeartOfMercyEntityDoDamage)
)
