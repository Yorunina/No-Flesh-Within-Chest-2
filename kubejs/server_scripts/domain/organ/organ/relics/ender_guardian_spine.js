// priority: 500
RegistryOrgan('kubejs:ender_guardian_spine')
    .addScore('chestcavity:defense', 3)
    .addScore('chestcavity:nerves', 1)
    .addScore('chestcavity:health', -1)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingDamageEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function EnderGuardianSpineBeHurt(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const source = event.source.actual
    if (!source || !source.isLiving()) return
    let amplifier = 0
    if (source.hasEffect('kubejs:fragile')) {
        amplifier = Math.min(source.getEffect('kubejs:fragile').getAmplifier() + 1, 9)
    }
    source.potionEffects.add('kubejs:fragile', 20 * 5, amplifier)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ender_guardian_spine')
        .addOnlyStrategy('entity_be_hurt', EnderGuardianSpineBeHurt)
)


