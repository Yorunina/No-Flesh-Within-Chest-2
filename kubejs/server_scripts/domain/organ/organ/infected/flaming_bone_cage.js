// priority: 500
RegistryOrgan('kubejs:flaming_bone_cage')
    .addScore('chestcavity:defense', 2)
    .addScore('chestcavity:breath_capacity', -0.5)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FlamingBoneCageEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const source = event.source.actual
    if (!source) return
    const fireTicks = entity.getRemainingFireTicks()
    customData.thornsDamage = customData.thornsDamage + fireTicks / 20
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:flaming_bone_cage')
        .addOnlyStrategy('entity_be_hurt', FlamingBoneCageEntityBeHurt)
)