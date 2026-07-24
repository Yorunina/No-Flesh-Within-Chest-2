// priority: 500
RegistryOrgan('kubejs:freezing_bone_cage')
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
function FreezingBoneCageEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const source = event.source.actual
    if (!source) return
    const freezingTicks = entity.getTicksFrozen()
    customData.thornsDamage = customData.thornsDamage + freezingTicks / 40
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:freezing_bone_cage')
        .addOnlyStrategy('entity_be_hurt', FreezingBoneCageEntityBeHurt)
)