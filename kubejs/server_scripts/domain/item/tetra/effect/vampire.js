// priority: 500

/**
 * 按护甲、抗性及吸收结算后的伤害吸血，以目标剩余生命值为上限。
 * @param {Object} customData
 * @param {Internal.LivingDamageEvent} event
 */
function VampireEntityFinalDamage(customData, event, effectSource) {
    if (event.amount <= 0) return
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (!TetraAttackIsMelee(event, sourceEntity)) return
    if (!TetraAttackFullCharge(event, sourceEntity)) return

    if (effectSource.level <= 0 || effectSource.efficiency <= 0) return

    let healthLost = Math.min(event.amount, Math.max(0, event.entity.health))
    let heal = Math.min(healthLost * effectSource.level / 100, effectSource.efficiency)
    if (heal <= 0 || !sourceEntity.isAlive()) return
    sourceEntity.heal(heal)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:vampire')
        .addStrategy('entity_final_damage', VampireEntityFinalDamage)
)
