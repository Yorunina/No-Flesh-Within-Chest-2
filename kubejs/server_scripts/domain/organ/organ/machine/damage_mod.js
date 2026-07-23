// priority: 500
RegistryOrgan('kubejs:damage_mod')
    .addScore('chestcavity:speed', -1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DamageModEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.hasEffect('kubejs:marking') && entity.getEffect('kubejs:marking').getDuration() > 20 * 5) return
    entity.potionEffects.add('kubejs:marking', 20 * 30, 0, false, false)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:damage_mod')
        .addOnlyStrategy('entity_do_damage', DamageModEntityDoDamage)
)