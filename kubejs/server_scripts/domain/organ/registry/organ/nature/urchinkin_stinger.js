// priority: 500
RegistryOrgan('kubejs:urchinkin_stinger')
    .addScore('chestcavity:defense', 1.5)
    .addScore('chestcavity:endurance', 1)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function UrchinkinStingerEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const source = event.source.actual
    if (!source || !source.isLiving()) return
    const entity = event.entity
    const harmEffectList = []
    entity.potionEffects.active.forEach(pEffect => {
        if (pEffect.effect.isHarmful()) {
            harmEffectList.push(pEffect)
        }
    })
    if (harmEffectList.length <= 0) return
    /**@type {Internal.MobEffectInstance} */
    let targetEffect = RandomGet(harmEffectList)
    if (targetEffect.effect.isInstantenous()) return
    source.potionEffects.add(targetEffect.getEffect(), 10 * 20, targetEffect.getAmplifier())
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:urchinkin_stinger')
        .addOnlyStrategy('entity_be_hurt', UrchinkinStingerEntityBeHurt)
)