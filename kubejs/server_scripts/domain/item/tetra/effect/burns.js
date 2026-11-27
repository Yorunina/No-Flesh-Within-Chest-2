// priority: 500
/**
 * 在器官结算前执行，保留本效果的物品读取时机。
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function BurnsEntityDoDamage(customData, event, effectSource) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const targetEntity = event.entity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (sourceEntity.isPlayer() && !TetraAttackFullCharge(event, sourceEntity)) return
    if (effectSource.efficiency <= 0 || effectSource.level <= 0) return
    if (effectSource.level >= 10) {
        targetEntity.setRemainingFireTicks(targetEntity.getRemainingFireTicks() + Math.floor(effectSource.efficiency * (effectSource.level / 10)) * 20)
    } else if (effectSource.level > 0 && effectSource.level * 10 > Math.random() * 100) {
        targetEntity.setRemainingFireTicks(targetEntity.getRemainingFireTicks() + effectSource.efficiency * 20)
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:burns')
        .addStrategy('entity_damage_first', BurnsEntityDoDamage)
)

