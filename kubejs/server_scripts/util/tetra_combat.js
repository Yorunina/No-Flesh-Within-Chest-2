// priority: 3000

let TETRA_DAMAGE_ECHO = $ResourceKey.create($Registries.DAMAGE_TYPE, new $ResourceLocation('kubejs:damage_echo'))

function TetraAttackData(source) {
    if (!MAADamageSources.supportsData(source) || !source.hasCustomData()) return null
    let data = source.customData
    return data.contains('combat', TAG_COMPOUND) ? data.getCompound('combat') : null
}

function TetraAttackItem(event, sourceEntity) {
    if (!MAADamageSources.supportsData(event.source)) return sourceEntity.mainHandItem
    return event.source.getItemData('weapon') ?? sourceEntity.mainHandItem
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
    let direct = event.source.getDirectEntity()
    if (!direct || !direct.equals(sourceEntity)) return false
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

/** 伤害来源实体（event.source.actual，惰性缓存一次）
 * @param {Object} ctx
 */
function TetraHurtSourceEntity(ctx) {
    if (!ctx._srcResolved) {
        ctx._srcEnt = ctx.source.actual
        ctx._srcResolved = true
    }
    return ctx._srcEnt
}

/** 攻击武器（stack + ModularItem）惰性缓存，追击使用快照
 * @param {Object} ctx
 */
function TetraHurtResolveSourceItem(ctx) {
    if (ctx._srcChecked) return
    ctx._srcChecked = true
    let e = TetraHurtSourceEntity(ctx)
    if (!e || !e.isLiving()) return
    let stack = TetraAttackItem(ctx.event, e)
    if (stack.isEmpty()) return
    let item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item)) return
    ctx._srcStack = stack
    ctx._srcItem = item
}

/** 攻击者主手指定 effect 等级（0=无主手 modular 物品或无该 effect）
 * @param {Object} ctx
 * @param {string} key
 */
function TetraHurtSourceLevel(ctx, key) {
    TetraHurtResolveSourceItem(ctx)
    if (!ctx._srcItem) return 0
    return ctx._srcItem.getEffectLevel(ctx._srcStack, key)
}

/** 攻击者主手指定 effect efficiency，同 TetraHurtSourceLevel
 * @param {Object} ctx
 * @param {string} key
 */
function TetraHurtSourceEfficiency(ctx, key) {
    TetraHurtResolveSourceItem(ctx)
    if (!ctx._srcItem) return 0
    return ctx._srcItem.getEffectEfficiency(ctx._srcStack, key)
}

/** 受害者双手（各自 stack + ModularItem）惰性缓存
 * @param {Object} ctx
 */
function TetraHurtResolveTargetItems(ctx) {
    if (ctx._tgtChecked) return
    ctx._tgtChecked = true
    let e = ctx.entity
    let m = e.mainHandItem
    if (!m.isEmpty()) {
        let it = m.getItem()
        if (TetraJSUtils.isModularItem(it)) { ctx._tgtMain = m; ctx._tgtMainItem = it }
    }
    let o = e.offHandItem
    if (!o.isEmpty()) {
        let it = o.getItem()
        if (TetraJSUtils.isModularItem(it)) { ctx._tgtOff = o; ctx._tgtOffItem = it }
    }
}

/** 受害者双手指定 effect 等级取较高手（armor/defense 语义，不叠加）
 * @param {Object} ctx
 * @param {string} key
 */
function TetraHurtTargetLevel(ctx, key) {
    TetraHurtResolveTargetItems(ctx)
    let a = ctx._tgtMainItem ? ctx._tgtMainItem.getEffectLevel(ctx._tgtMain, key) : 0
    let b = ctx._tgtOffItem ? ctx._tgtOffItem.getEffectLevel(ctx._tgtOff, key) : 0
    return Math.max(a, b)
}

/** 受害者任一手持有该 effect（boolean，lightning/freezing immune 语义）
 * @param {Object} ctx
 * @param {string} key
 */
function TetraHurtTargetHas(ctx, key) {
    return TetraHurtTargetLevel(ctx, key) > 0
}
