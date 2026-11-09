// priority: 0

/**
 * 按护甲、抗性及吸收结算后的伤害吸血，以目标剩余生命值为上限。
 * @param {Object} customData
 * @param {Internal.LivingDamageEvent} event
 */
function VampireEntityDoDamageFinal(customData, event) {
    if (event.entity.level.isClientSide()) return
    if (event.amount <= 0) return
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (!TetraAttackIsMelee(event, sourceEntity)) return
    if (!TetraAttackFullCharge(event, sourceEntity)) return

    let stack = TetraAttackItem(event, sourceEntity)
    if (stack.isEmpty()) return
    let modularItem = stack.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(stack, 'kubejs:vampire')
    let effectEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:vampire')
    if (effectLevel <= 0 || effectEfficiency <= 0) return

    let healthLost = Math.min(event.amount, Math.max(0, event.entity.health))
    let heal = Math.min(healthLost * effectLevel / 100, effectEfficiency)
    if (heal <= 0 || !sourceEntity.isAlive()) return
    sourceEntity.heal(heal)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:vampire')
        .addStrategy('entity_do_damage_final', VampireEntityDoDamageFinal)
)
