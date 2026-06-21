// priority: 500
RegistryOrgan('kubejs:pufferfish_liver')
    .addScore('chestcavity:detoxification', 1)
    .addScore('chestcavity:endurance', 1)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function PufferfishLiverEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const source = event.source.actual
    if (!source || !source.isLiving()) return
    if (source.hasEffect('minecraft:poison')) return
    source.potionEffects.add('minecraft:poison', 10 * 20, 0, false, true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pufferfish_liver')
        .addOnlyStrategy('entity_be_hurt', PufferfishLiverEntityBeHurt)
)
