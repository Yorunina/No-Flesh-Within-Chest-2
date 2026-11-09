// priority: 0

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
 * @param {Internal.LivingHurtEvent} event
 */
function PurityEntityDoDamage(customData, event) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = TetraHurtSourceEntity(customData)
    let targetEntity = customData.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && !TetraAttackFullCharge(event, sourceEntity)) return
    let effectLevel = TetraHurtSourceLevel(customData, 'kubejs:purity')
    let effectEfficiency = TetraHurtSourceEfficiency(customData, 'kubejs:purity')
    if (effectLevel <= 0 || effectEfficiency <= 0) return
    if (Math.random() >= effectLevel / 100) return
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
        effectDamage = amplifier * (duration / 20) * effectEfficiency / 10
    }
    targetEntity.removeEffect(pick.id)
    if (event.amount < effectDamage) event.amount = effectDamage
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:purity')
        .addStrategy('entity_do_damage', PurityEntityDoDamage, -110)
)
