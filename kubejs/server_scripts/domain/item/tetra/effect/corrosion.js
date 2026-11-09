// priority: 0

let CORROSION_EFFECT_ID = 'biomancy:corrosive'

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function CorrosionEntityDoDamage(customData, event) {
    if (event.entity.level.isClientSide()) return
    /**@type {Internal.LivingEntity} */
    let sourceEntity = TetraHurtSourceEntity(customData)
    if (!sourceEntity || !sourceEntity.isLiving()) return
    let effectLevel = TetraHurtSourceLevel(customData, 'kubejs:corrosion')
    let effectEfficiency = TetraHurtSourceEfficiency(customData, 'kubejs:corrosion')
    if (effectLevel <= 0 || effectEfficiency <= 0) return

    let target = event.entity
    let gain = Math.round(effectLevel)
    let duration = Math.round(effectEfficiency * 20)
    let inst = target.getEffect(CORROSION_EFFECT_ID)
    if (inst) {
        let newAmp = inst.getAmplifier() + gain
        if (inst.getDuration() > duration) duration = inst.getDuration()
        target.removeEffect(CORROSION_EFFECT_ID)
        target.potionEffects.add(CORROSION_EFFECT_ID, duration, newAmp, false, true)
    } else {
        target.potionEffects.add(CORROSION_EFFECT_ID, duration, Math.max(0, gain - 1), false, true)
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:corrosion')
        .addStrategy('entity_do_damage', CorrosionEntityDoDamage, -30)
)
