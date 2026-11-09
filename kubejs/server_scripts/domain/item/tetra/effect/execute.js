// priority: 0

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function ExecuteEntityDoDamage(customData, event) {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = TetraHurtSourceEntity(customData)
    let targetEntity = customData.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && !TetraAttackFullCharge(event, sourceEntity)) return
    if (event.source.getType() == 'generic') return
    let effectLevel = TetraHurtSourceLevel(customData, 'kubejs:execute')
    let effectEfficiency = TetraHurtSourceEfficiency(customData, 'kubejs:execute')
    if (effectLevel <= 0 && effectEfficiency <= 0) return
    let maxHealth = targetEntity.maxHealth
    if (maxHealth <= 0) return
    let healthPercent = targetEntity.health / maxHealth
    event.amount = event.amount * (1 + (1 - healthPercent) * effectLevel / 10)
    if (effectEfficiency > 0 && healthPercent < effectEfficiency / 100) {
        targetEntity.health = 0
    }
}

/**
 * @param {Object} customData
 * @param {Internal.LivingDeathEvent} event
 */
function ExecuteEntityKill(customData, event) {
    if (event.entity.level.isClientSide()) return
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return

    let heldItem = TetraAttackItem(event, sourceEntity)
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    if (modularItem.getEffectLevel(heldItem, 'kubejs:execute') <= 0) return

    let target = event.entity
    let bloodSource = sourceEntity.isPlayer()
        ? sourceEntity.damageSources().playerAttack(sourceEntity)
        : sourceEntity.damageSources().mobAttack(sourceEntity)
    $SacrificeSpell.doSacrificeExplosion(target.level, bloodSource, 0, 3.0, target.position())
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:execute')
        .addStrategy('entity_do_damage', ExecuteEntityDoDamage, -60)
        .addStrategy('entity_kill', ExecuteEntityKill)
)
