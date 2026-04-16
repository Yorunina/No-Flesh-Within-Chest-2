// priority: 500
RegistryOrgan('kubejs:leviathan_rib')
    .addScore('chestcavity:defense', 2.5)
    .addScore('chestcavity:swim_speed', 1)
    .addScore('chestcavity:endurance', -0.5)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LeviathanRibEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    let thornsDamage = 3
    const entity = event.entity
    if (entity.hasEffect('minecraft:darkness')) {
        thornsDamage = 1
    }
    customData.thornsDamage = customData.thornsDamage + thornsDamage
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:leviathan_rib')
        .addOnlyStrategy('entity_be_hurt', LeviathanRibEntityBeHurt)
)