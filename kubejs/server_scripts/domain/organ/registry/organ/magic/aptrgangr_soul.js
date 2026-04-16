// priority: 500
RegistryOrgan('kubejs:aptrgangr_soul')
    .addScore('chestcavity:health', 1)
    .addScore('chestcavity:defense', 1.5)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function AptrgangrSoulEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.hasEffect('potioncore:solid_core')) return

    if (!entity.isPlayer()) {
        entity.potionEffects.add('potioncore:solid_core', 3 * 20)
    } else {
        let cooldowns = entity.getCooldowns()
        if (cooldowns.isOnCooldown(organItem)) return
        entity.potionEffects.add('potioncore:solid_core', 3 * 20)
        entity.addItemCooldown(organItem, 10 * 20)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:aptrgangr_soul')
        .addOnlyStrategy('entity_be_hurt', AptrgangrSoulEntityBeHurt)
)
