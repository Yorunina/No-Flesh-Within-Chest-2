// priority: 0

let DEMON_CURSE_EFFECT_ID = 'kubejs:demon_curse'

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function DemonDevourEntityDoDamage(customData, event) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = TetraHurtSourceEntity(customData)
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && sourceEntity.isCreative()) return
    let effectLevel = TetraHurtSourceLevel(customData, 'kubejs:demon_devour')
    let effectEfficiency = TetraHurtSourceEfficiency(customData, 'kubejs:demon_devour')
    if (effectLevel <= 0 || effectEfficiency <= 0) return
    let amplifier = Math.max(0, Math.round(effectLevel) - 1)
    let duration = Math.round(effectEfficiency * 20)
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
        .addStrategy('entity_do_damage', DemonDevourEntityDoDamage, -50)
)
