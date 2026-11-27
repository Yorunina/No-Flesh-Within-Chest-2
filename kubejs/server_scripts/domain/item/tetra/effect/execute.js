// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function ExecuteEntityDoDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    let targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && !TetraAttackFullCharge(event, sourceEntity)) return
    if (event.source.getType() == 'generic') return
    if (effectSource.level <= 0 && effectSource.efficiency <= 0) return
    let maxHealth = targetEntity.maxHealth
    if (maxHealth <= 0) return
    let healthPercent = targetEntity.health / maxHealth
    event.amount = event.amount * (1 + (1 - healthPercent) * effectSource.level / 10)
    if (effectSource.efficiency > 0 && healthPercent < effectSource.efficiency / 100) {
        targetEntity.health = 0
    }
}

/**
 * @param {Object} customData
 * @param {Internal.LivingDeathEvent} event
 */
function ExecuteEntityKill(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return

    if (effectSource.level <= 0) return

    let target = event.entity
    let bloodSource = sourceEntity.isPlayer()
        ? sourceEntity.damageSources().playerAttack(sourceEntity)
        : sourceEntity.damageSources().mobAttack(sourceEntity)
    $SacrificeSpell.doSacrificeExplosion(target.level, bloodSource, 0, 3.0, target.position())
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:execute')
        .addStrategy('entity_do_damage', ExecuteEntityDoDamage)
        .addOnlyStrategy('entity_kill', ExecuteEntityKill)
)
