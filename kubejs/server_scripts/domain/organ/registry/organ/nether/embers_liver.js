// priority: 500
RegistryOrgan('kubejs:embers_liver')
    .addScore('chestcavity:detoxification', 1)
    .addScore('chestcavity:fire_resistant', 1)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EmbersLiverEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (slotType == RevolutionFlame) {
        let fireTick = 60 * event.amount
        let remainTick = entity.getRemainingFireTicks()
        if (fireTick <= remainTick) {
            entity.setRemainingFireTicks(remainTick - fireTick)
        } else {
            event.setAmount(event.amount - Math.floor(remainTick / 60))
            entity.setRemainingFireTicks(0)
        }
    } else {
        let fireTick = 20 * event.amount
        entity.setRemainingFireTicks(entity.getRemainingFireTicks() + fireTick)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:embers_liver')
        .addStrategy('entity_be_hurt', EmbersLiverEntityBeHurt)
)