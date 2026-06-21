// priority: 500
RegistryOrgan('kubejs:vita_rose_liver')
    .addScore('chestcavity:detoxification', 1.5)
    .addScore('chestcavity:filtration', 0.5)
    .addScore('kubejs:photosynthesis', 0.5)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function VitaRoseLiverDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    /**@type {Internal.LivingEntity} */
    const target = event.entity
    if (target.getHealth() < target.getMaxHealth() * 0.99) return
    target.potionEffects.add('kubejs:vita_toxins', 20 * 60, 0, false, false)
    if (!sourceEntity.getUuid()) return
    SetVitaToxinsSource(target, sourceEntity.getUuid())
    if (GetCustomDataMap(target.chestCavityInstance, 'hasVitaBerry', 0) == 1) {
        SetVitaToxinsType(target, 'max_health')
        SetVitaToxinsCoe(target, 2)
    } else {
        SetVitaToxinsType(target, 'attack_damage')
        SetVitaToxinsCoe(target, 1)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:vita_rose_liver')
        .addOnlyStrategy('entity_do_damage', VitaRoseLiverDoDamage)
)