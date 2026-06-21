// priority: 500
RegistryOrgan('kubejs:soul_core')
    .addScore('chestcavity:health', 1.5)
    .addScore('chestcavity:defense', -0.5)
    .setCanSpawn(true)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SoulCoreEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = entity.level
    if (entity.isFullyFrozen()) {
        entity.invulnerableTime = 0
        entity.attack(level.damageSources().freeze(), event.amount / 2)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:soul_core')
        .addOnlyStrategy('entity_do_damage', SoulCoreEntityDoDamage)
)
