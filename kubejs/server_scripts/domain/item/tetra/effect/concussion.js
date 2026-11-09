// priority: 0

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function ConcussionEntityDoDamage(customData, event) {
    if (event.entity.level.isClientSide()) return
    /**@type {Internal.LivingEntity} */
    let sourceEntity = TetraHurtSourceEntity(customData)
    let targetEntity = customData.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return

    let isSlamSplash = SlamIsSplash(event.source)

    if (!isSlamSplash) {
        if (!TetraAttackIsMelee(event, sourceEntity)) return
        if (!TetraAttackFullCharge(event, sourceEntity)) return
    }

    let effectLevel = TetraHurtSourceLevel(customData, 'kubejs:concussion')
    let effectEfficiency = TetraHurtSourceEfficiency(customData, 'kubejs:concussion')
    if (effectLevel <= 0 || effectEfficiency <= 0) return

    if (targetEntity.getEffect('cataclysm:stun')) return

    let rand = new $JavaRandom()
    if (rand.nextFloat() >= effectLevel / 100) return

    targetEntity.potionEffects.add('cataclysm:stun', Math.round(effectEfficiency * 20), 0, false, true)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:concussion')
        .addStrategy('entity_do_damage', ConcussionEntityDoDamage, -20)
)
