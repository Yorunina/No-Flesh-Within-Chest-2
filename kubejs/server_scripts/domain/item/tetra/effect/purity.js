// priority: 500
let PURITY_BLACKLIST = [
]

/**
 * @param {Internal.MobEffect} mobEffect
 */
function PurityGetEffectId(mobEffect) {
    return $ForgeRegistries.MOB_EFFECTS.getKey(mobEffect).toString()
}

/**
 * @param {Object} customData
 * @param {Internal.LivingDamageEvent} event
 */
function PurityEntityFinalDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    let targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && !TetraAttackFullCharge(event, sourceEntity)) return
    if (effectSource.level <= 0 || effectSource.efficiency <= 0) return
    if (Math.random() >= effectSource.level / 100) return
    let candidates = []
    targetEntity.getActiveEffectsMap().forEach((effect, inst) => {
        let id = PurityGetEffectId(effect)
        if (PURITY_BLACKLIST.indexOf(id) !== -1) return
        candidates.push({ inst: inst, id: id })
    })
    if (candidates.length === 0) return
    let pick = candidates[Math.floor(Math.random() * candidates.length)]
    let inst = pick.inst
    let duration = inst.getDuration()
    let effectDamage
    if (duration < 0) {
        effectDamage = targetEntity.maxHealth * 0.1
    } else {
        let amplifier = inst.getAmplifier() + 1
        effectDamage = amplifier * (duration / 20) * effectSource.efficiency / 10
    }
    targetEntity.removeEffect(pick.id)
    if (event.amount < effectDamage) event.amount = effectDamage
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:purity')
        .addStrategy('entity_final_damage', PurityEntityFinalDamage)
)
