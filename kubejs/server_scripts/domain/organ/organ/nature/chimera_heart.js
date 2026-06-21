// priority: 500
RegistryOrgan('kubejs:chimera_heart')
    .addScore('chestcavity:health', 1)
    .addScore('kubejs:extreme_fitness', 2)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ChimeraHeartEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    if (OrganItemCoolDown(entity, organItem)) return
    if (event.amount <= entity.getHealth() + entity.getAbsorptionAmount()) return
    entity.setAbsorptionAmount(entity.getAbsorptionAmount() + event.amount)
    event.amount = 0
    entity.addItemCooldown(organItem, 20 * 180)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:chimera_heart')
        .addOnlyStrategy('entity_be_hurt', ChimeraHeartEntityBeHurt)
)

