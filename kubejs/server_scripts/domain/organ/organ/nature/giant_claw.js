// priority: 500
RegistryOrgan('kubejs:giant_claw')
    .addScore('kubejs:extreme_strength', 1)
    .addScore('chestcavity:luck', 1)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function GiantClawEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (RandomWithPlayerLuck(entity) <= 0.8) return
    let amplifier = 0
    let duration = 200
    if (entity.hasEffect('cataclysm:wetness')) {
        let wetnessEffect = entity.getEffect('cataclysm:wetness')
        amplifier = Math.min(wetnessEffect.getAmplifier() + 1, 4)
    }
    entity.potionEffects.add('cataclysm:wetness', duration, amplifier)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:giant_claw')
        .addOnlyStrategy('entity_do_damage', GiantClawEntityDoDamage)
)