// priority: 500

let OPEN_WOUND_EFFECT_ID = 'tetra:bleeding'

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function OpenWoundEntityDoDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (effectSource.level <= 0 || effectSource.efficiency <= 0) return

    let target = event.entity
    let gain = Math.round(effectSource.level)
    let duration = Math.round(effectSource.efficiency * 20)
    // Tetra 每跳直接以 amplifier 作为基础伤害；药水显示等级为 amplifier + 1。
    let inst = target.getEffect(OPEN_WOUND_EFFECT_ID)
    if (inst) {
        let newAmp = inst.getAmplifier() + gain
        if (inst.getDuration() > duration) duration = inst.getDuration()
        target.removeEffect(OPEN_WOUND_EFFECT_ID)
        target.potionEffects.add(OPEN_WOUND_EFFECT_ID, duration, newAmp, false, true)
    } else {
        target.potionEffects.add(OPEN_WOUND_EFFECT_ID, duration, gain, false, true)
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:open_wound')
        .addStrategy('entity_damage_first', OpenWoundEntityDoDamage)
)
