// priority: 500
RegistryOrgan('kubejs:prowler_rotating_shaft')
    .addScore('chestcavity:nerves', 0.5)
    .addScore('chestcavity:defense', -1)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ProwlerRotatingShaftEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    if (event.amount <= 1) return
    const level = entity.level
    let tamedLivingList = GetTamedEntityWithinRadius(level, entity, 16)

    if (tamedLivingList.length <= 0) return
    let sharedAmount = event.amount / (tamedLivingList.length + 1)

    for (let target of tamedLivingList) {
        if (target.invulnerableTime > 0) continue
        target.attack(event.source, sharedAmount)
        event.amount = event.amount - sharedAmount
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:prowler_rotating_shaft')
        .addOnlyStrategy('entity_be_hurt', ProwlerRotatingShaftEntityBeHurt)
)
