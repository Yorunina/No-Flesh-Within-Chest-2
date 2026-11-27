// priority: 3000
function TetraAttackData(source) {
    if (!MAADamageSources.supportsData(source) || !source.hasCustomData()) return null
    let data = source.customData
    return data.contains('combat', TAG_COMPOUND) ? data.getCompound('combat') : null
}

/** 追击继承触发时的蓄力；非玩家没有蓄力门槛。 */
function TetraAttackFullCharge(event, sourceEntity) {
    let data = TetraAttackData(event.source)
    if (data && data.contains('full_charge')) return data.getBoolean('full_charge')
    return !sourceEntity.isPlayer() || IsFullChargeAttck(sourceEntity)
}

/** 原生直接近战，或明确继承近战资格的追击。 */
function TetraAttackIsMelee(event, sourceEntity) {
    let data = TetraAttackData(event.source)
    if (data && data.contains('melee')) return data.getBoolean('melee')
    let actual = event.source.actual
    if (!actual || !actual.equals(sourceEntity)) return false
    return sourceEntity.isPlayer() ? event.source.is($DamageTypes.PLAYER_ATTACK)
        : event.source.is($DamageTypes.MOB_ATTACK) || event.source.is($DamageTypes.MOB_ATTACK_NO_AGGRO)
}

/** 创建带派生身份的来源；具体伤害规则由 startup 定义和数据包决定。 */
function TetraAttackSource(level, id, sourceEntity, kind) {
    let source = MAADamageSources.create(level, id, sourceEntity)
    let data = new $CompoundTag()
    data.putString('kind', kind)
    source.customData.put('combat', data)
    return source
}
