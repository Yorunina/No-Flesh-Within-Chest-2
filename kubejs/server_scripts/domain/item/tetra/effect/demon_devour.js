// priority: 500

let DEMON_CURSE_EFFECT_ID = 'kubejs:demon_curse'

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function DemonDevourEntityDoDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && sourceEntity.isCreative()) return
    if (effectSource.level <= 0 || effectSource.efficiency <= 0) return
    let amplifier = Math.max(0, Math.round(effectSource.level) - 1)
    let duration = Math.round(effectSource.efficiency * 20)
    let inst = sourceEntity.getEffect(DEMON_CURSE_EFFECT_ID)
    if (inst) {
        inst.setDuration(duration)
    } else {
        sourceEntity.potionEffects.add(DEMON_CURSE_EFFECT_ID, duration, amplifier, false, true)
        inst = sourceEntity.getEffect(DEMON_CURSE_EFFECT_ID)
        if (inst) inst.setDuration(duration)
    }
    sourceEntity.persistentData.putBoolean('kubejs_curse_hud_dirty', true)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:demon_devour')
        .addStrategy('entity_damage_first', DemonDevourEntityDoDamage)
)
