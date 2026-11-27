// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function ConcussionEntityDoDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    let targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return

    let isSlamSplash = SlamIsSplash(event.source)

    if (!isSlamSplash) {
        if (!TetraAttackIsMelee(event, sourceEntity)) return
        if (!TetraAttackFullCharge(event, sourceEntity)) return
    }

    if (effectSource.level <= 0 || effectSource.efficiency <= 0) return

    if (targetEntity.getEffect('cataclysm:stun')) return

    let rand = new $JavaRandom()
    if (rand.nextFloat() >= effectSource.level / 100) return

    targetEntity.potionEffects.add('cataclysm:stun', Math.round(effectSource.efficiency * 20), 0, false, true)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:concussion')
        .addStrategy('entity_damage_first', ConcussionEntityDoDamage)
)
