// priority: 500
RegistryOrgan('kubejs:wither_bone_cage')
    .addScore('chestcavity:defense', 2)
    .addScore('chestcavity:breath_capacity', -0.5)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function WitherBoneCageEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (RandomWithPlayerLuck(entity) <= 0.8) return
    let amplifier = 0
    let duration = 200
    if (entity.hasEffect('minecraft:wither')) {
        let witherEffect = entity.getEffect('minecraft:wither')
        amplifier = Math.min(witherEffect.getAmplifier() + 1, 4)
    }
    entity.potionEffects.add('minecraft:wither', duration, amplifier)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:wither_bone_cage')
        .addOnlyStrategy('entity_do_damage', WitherBoneCageEntityDoDamage)
)