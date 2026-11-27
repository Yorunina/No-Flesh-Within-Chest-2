// priority: 500

let CORROSION_EFFECT_ID = 'biomancy:corrosive'

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function CorrosionEntityDoDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (effectSource.level <= 0 || effectSource.efficiency <= 0) return

    let target = event.entity
    let gain = Math.round(effectSource.level)
    let duration = Math.round(effectSource.efficiency * 20)
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
        .addStrategy('entity_damage_first', CorrosionEntityDoDamage)
)
