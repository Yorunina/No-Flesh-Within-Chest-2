// priority: 2000
const TetraOrganEffectSlotDataKey = 'tetraOrganEffects'

/** @typedef {{effect: Internal.ItemEffect, effectId: string}} TetraOrganEffectEntry */

/**
 * @param {Internal.ModularItem} modularItem
 * @param {Internal.ItemStack} stack
 * @returns {Object<string, TetraOrganEffectEntry[]>}
 */
function BuildTetraOrganEffectsByEvent(modularItem, stack) {
    const byEvent = {}
    modularItem.getEffects(stack).forEach(effect => {
        const effectId = String(effect.getKey())
        const model = TetraOrganEffectStrategyMap[effectId]
        if (!model) return
        const entry = { effect: effect, effectId: effectId }
        Object.keys(model.strategyMap).forEach(eventId => {
            if (!byEvent[eventId]) byEvent[eventId] = []
            byEvent[eventId].push(entry)
        })
    })
    return byEvent
}

/**
 * @param {Internal.ChestCavityInstance} chestCavity
 * @param {number} slotIndex
 * @param {Internal.ModularItem} modularItem
 * @param {Internal.ItemStack} stack
 * @returns {Object<string, TetraOrganEffectEntry[]>}
 */
function CacheTetraOrganEffectsByEvent(chestCavity, slotIndex, modularItem, stack) {
    const byEvent = BuildTetraOrganEffectsByEvent(modularItem, stack)
    chestCavity.setSlotData(slotIndex, TetraOrganEffectSlotDataKey, {
        revision: TetraOrganEffectRegistryRevision,
        byEvent: byEvent,
    })
    return byEvent
}

/**
 * @param {Internal.ChestCavityInstance} chestCavity
 * @param {number} slotIndex
 * @param {Internal.ModularItem} modularItem
 * @param {Internal.ItemStack} stack
 * @returns {Object<string, TetraOrganEffectEntry[]>}
 */
function GetTetraOrganEffectsByEvent(chestCavity, slotIndex, modularItem, stack) {
    const cached = chestCavity.getSlotData(slotIndex, TetraOrganEffectSlotDataKey)
    if (cached && cached.revision === TetraOrganEffectRegistryRevision) return cached.byEvent

    // 槽位数据会跨脚本重载保留，策略注册代次变更后要重新筛选候选。
    return CacheTetraOrganEffectsByEvent(chestCavity, slotIndex, modularItem, stack)
}

// 比较完候选槽位后，把选出的唯一回调并入普通回调的优先级队列。
function QueueOnlyTetraOrganEffectStrategies(onlyEffectMap, strategyFuncList) {
    onlyEffectMap.forEach(source => {
        source.strategies.forEach(strategy => {
            strategyFuncList.push(new PriorityArgsModel(strategy, source.args))
        })
    })
}

function CollectTetraOrganEffectStrategies(effects, eventId, args, source, strategyFuncList, onlyEffectMap) {
    if (!effects) return
    const { modularItem, stack, slotIndex, slotType } = source
    effects.forEach(entry => {
        const { effect, effectId } = entry
        const strategies = TetraOrganEffectStrategyMap[effectId].strategyMap[eventId]
        const strategyArgs = args.concat(modularItem, effect, stack, slotIndex, slotType)
        strategies['default'].forEach(strategy => {
            strategyFuncList.push(new PriorityArgsModel(strategy, strategyArgs))
        })
        if (!strategies['only'].length) return

        // 每个 effect ID 只保留最高等级来源，同级取较小槽位以消除遍历顺序的影响。
        const level = modularItem.getEffectLevel(stack, effect)
        const strongest = onlyEffectMap.get(effectId)
        if (!strongest || level > strongest.level || (level === strongest.level && slotIndex < strongest.slotIndex)) {
            onlyEffectMap.set(effectId, { level: level, slotIndex: slotIndex, strategies: strategies['only'], args: strategyArgs })
        }
    })
}

function TetraOrganEffectModel(effectId) {
    this.effectId = effectId
    /** @type {Object<string, {default: PriorityFuncModel[], only: PriorityFuncModel[]}>} */
    this.strategyMap = {}
    return this
}

TetraOrganEffectModel.prototype = {
    /**
     * @param {$OrganEventIdType} eventId
     * @param {Function} func
     * @param {number} priority
     */
    addStrategy: function (eventId, func, priority) {
        if (!this.strategyMap[eventId]) this.strategyMap[eventId] = { 'default': [], 'only': [] }
        this.strategyMap[eventId]['default'].push(new PriorityFuncModel(func, priority))
        return this
    },
    /**
     * @param {$OrganEventIdType} eventId
     * @param {Function} func
     * @param {number} priority
     */
    addOnlyStrategy: function (eventId, func, priority) {
        if (!this.strategyMap[eventId]) this.strategyMap[eventId] = { 'default': [], 'only': [] }
        this.strategyMap[eventId]['only'].push(new PriorityFuncModel(func, priority))
        return this
    },
}
