// priority: 500
RegistryOrgan('kubejs:magam_colloid')
    .addScore('chestcavity:health', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function MagamColloidEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (slotType == RevolutionFlame) {
        let fireTick = 60 * event.amount
        let remainTick = entity.getRemainingFireTicks()
        if (fireTick <= remainTick) {
            entity.setRemainingFireTicks(remainTick - fireTick)
            event.setAmount(event.amount - Math.floor(fireTick / 60))
        } else {
            entity.setRemainingFireTicks(0)
            event.setAmount(event.amount - Math.floor(remainTick / 60))
        }
    } else {
        let fireTick = 20 * event.amount
        entity.setRemainingFireTicks(entity.getRemainingFireTicks() + fireTick)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:magam_colloid')
        .addOnlyStrategy('entity_be_hurt', MagamColloidEntityBeHurt)
)