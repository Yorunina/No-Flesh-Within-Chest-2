// priority: 500
RegistryOrgan('kubejs:ignited_armour')
    .addScore('chestcavity:defense', 1)
    .addScore('chestcavity:fire_resistant', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function IgnitedArmourEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const source = event.source.actual
    if (!source) return
    const chestCavity = entity.chestCavityInstance
    let fireResistantScore = chestCavity.getOrganScore('chestcavity:fire_resistant')
    let fireTicks = source.getRemainingFireTicks()
    source.setRemainingFireTicks(fireTicks, fireResistantScore * 10)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ignited_armour')
        .addOnlyStrategy('entity_be_hurt', IgnitedArmourEntityBeHurt)
)
