// priority: 0

/**
 * 原攻击作为首段，在主包和工具命中效果之前拆分伤害。
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function ShredderEntityDoDamage(customData, event) {
    if (event.entity.level.isClientSide() || event.amount <= 0) return
    // 回响永不再次拆段；砸地等其他已标识的派生伤害也不能生成绞碎。
    if (event.source.is(TETRA_DAMAGE_ECHO) || TetraAttackData(event.source)) return
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (!TetraAttackIsMelee(event, sourceEntity) || !TetraAttackFullCharge(event, sourceEntity)) return

    let stack = TetraAttackItem(event, sourceEntity)
    let item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item)) return
    let effectLevel = item.getEffectLevel(stack, 'kubejs:shredder')
    if (effectLevel <= 0) return
    let effectEfficiency = item.getEffectEfficiency(stack, 'kubejs:shredder')
    if (effectEfficiency <= 0) return
    let damage = event.amount / effectEfficiency
    if (!isFinite(damage) || damage <= 0) return

    let source = TetraAttackSource(event.entity.level, 'kubejs:damage_echo', sourceEntity, 'shredder_segment')
    let data = TetraAttackData(source)
    data.putBoolean('full_charge', true)
    data.putBoolean('melee', true)
    source.setObjectData(WeaponDataKey, stack.copy())
    let attack = {
        entity: event.entity,
        source: source,
        damage: damage,
        remaining: effectLevel - 1,
        first: event
    }
    event.amount = damage
    if (attack.remaining > 0) event.entity.level.server.scheduleInTicks(1, () => ShredderContinue(attack))
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:shredder')
        .addStrategy('entity_do_damage_first', ShredderEntityDoDamage)
)

/**
 * 每条攻击独立续段，不按受害者 UUID 合并，也不修改公共无敌时间。
 * @param {Object} attack 本条攻击的目标、来源、分段伤害及剩余段数
 */
function ShredderContinue(attack) {
    if (attack.first) {
        if (attack.first.isCanceled() || attack.first.amount <= 0) return
        attack.first = null
    }
    let target = attack.entity
    let sourceEntity = attack.source.actual
    if (!target.isAlive() || target.isRemoved() || !sourceEntity.isAlive() || sourceEntity.isRemoved()) return
    if (!target.level.equals(sourceEntity.level)) return
    target.attack(attack.source, attack.damage)
    attack.remaining--
    if (attack.remaining > 0 && target.isAlive()) {
        target.level.server.scheduleInTicks(1, () => ShredderContinue(attack))
    }
}
