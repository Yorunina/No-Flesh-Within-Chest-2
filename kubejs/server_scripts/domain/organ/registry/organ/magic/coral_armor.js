// priority: 500
RegistryOrgan('kubejs:coral_armor')
    .addScore('chestcavity:defense', 1.5)
    .addScore('kubejs:extreme_fitness', 0.5)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function CoralArmorEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    entity.getMagicData().addMana(event.amount)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:coral_armor')
        .addOnlyStrategy('entity_be_hurt', CoralArmorEntityBeHurt)
)