// priority: 2000
/**
 * Tag 羁绊。内容：server_scripts/domain/organ/tag_effect/<tag>.js（priority 500）
 * 签名：(customData, event, tagId, count)
 * 件数读取 Java 正常重算快照；customDataMap.tagEffect 保留派发与前次计数。
 * 已派发：chest_cavity_update、food_eaten、mob_effect_applicable。
 */
const TagEffectStateKey = 'tagEffect'

/**
 * 创建指定器官标签的羁绊策略集合。
 * @constructor
 * @param {string} tagId
 */
function TagStrategyModel(tagId) {
    this.tagId = tagId
    /** @type {Object<string, PriorityFuncModel[]>} */
    this.strategyMap = {}
    return this
}

TagStrategyModel.prototype = {
    /**
     * 添加标签羁绊策略；同一事件按优先级降序执行。
     * @param {$OrganEventIdType} eventId
     * @param {(customData: OrganEventCustomData & OrganChestCavityUpdateStrategyCustomData, event: Internal.EvaluateChestCavityJS | Internal.FoodEatenEventJS | Internal.MobEffectEvent$Applicable, tagId: string, count: number) => void} func
     * @param {number} [priority=0]
     * @returns {TagStrategyModel}
     */
    addStrategy: function (eventId, func, priority) {
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = []
        }
        this.strategyMap[eventId].push(new PriorityFuncModel(func, priority))
        return this
    },
}

/**
 * 读取胸腔缓存的标签计数及事件派发表。
 * @param {Internal.ChestCavityInstance | null} chestCavity
 * @returns {{counts: Object<string, number>, previousCounts: Object<string, number>, byEvent: Object<string, string[]>} | null}
 */
function GetTagEffectState(chestCavity) {
    if (!chestCavity) return null
    return GetCustomDataMap(chestCavity, TagEffectStateKey, null)
}

/**
 * 读取 Java 查询索引中的当前标签件数。
 * @param {Internal.ChestCavityInstance | null} chestCavity
 * @param {string} tagId
 * @returns {number}
 */
function GetTagCount(chestCavity, tagId) {
    if (!chestCavity) return 0
    return chestCavity.getOrganQueryIndex().getTagCount(tagId)
}

/**
 * 读取上次重算前保存的标签件数。
 * @param {Internal.ChestCavityInstance | null} chestCavity
 * @param {string} tagId
 * @returns {number}
 */
function GetPreviousTagCount(chestCavity, tagId) {
    let state = GetTagEffectState(chestCavity)
    if (!state || !state.previousCounts) return 0
    let count = state.previousCounts[tagId]
    return count ? count : 0
}

/**
 * @param {Internal.LivingEntity} entity
 * @param {string} effectId
 * @param {number} count
 * @param {number} minCount
 */
function RemovePlayerEffectIfTag(entity, effectId, count, minCount) {
    if (count < minCount) return
    if (!entity || !entity.isPlayer()) return
    entity.removeEffect(effectId)
}

/**
 * @param {Internal.MobEffectEvent$Applicable} event
 * @param {Internal.MobEffect} mobEffect
 * @param {number} count
 * @param {number} minCount
 */
function DenyPlayerEffectIfTag(event, mobEffect, count, minCount) {
    if (count < minCount) return
    const entity = event.getEntity()
    if (!entity || !entity.isPlayer()) return
    const effectInstance = event.getEffectInstance()
    if (!effectInstance) return
    if (!effectInstance.getEffect().equals(mobEffect)) return
    event.setResult('deny')
}

/**
 * @param {Internal.ChestCavityInstance} chestCavity
 */
function RebuildTagEffectState(chestCavity) {
    if (!chestCavity || !chestCavity.inventory) return
    let previous = GetTagEffectState(chestCavity)
    let previousCounts = previous && previous.counts ? previous.counts : {}
    let counts = {}
    let byEvent = {}
    let tagIds = Object.keys(TagStrategyMap)
    for (let i = 0; i < tagIds.length; i++) {
        let tagId = tagIds[i]
        let count = GetTagCount(chestCavity, tagId)
        counts[tagId] = count
        let strategyModel = TagStrategyMap[tagId]
        if (!strategyModel || !strategyModel.strategyMap) continue
        let eventIds = Object.keys(strategyModel.strategyMap)
        for (let j = 0; j < eventIds.length; j++) {
            let eventId = eventIds[j]
            if (eventId != 'chest_cavity_update' && count <= 0) continue
            if (!byEvent[eventId]) byEvent[eventId] = []
            byEvent[eventId].push(tagId)
        }
    }
    SetCustomDataMap(chestCavity, TagEffectStateKey, {
        counts: counts,
        previousCounts: previousCounts,
        byEvent: byEvent
    })
}

/**
 * @param {string} eventId
 * @param {Internal.ChestCavityInstance} chestCavity
 * @param {any[]} args customData already unshifted
 */
function RunTagStrategies(eventId, chestCavity, args) {
    if (!chestCavity) return
    let state = GetTagEffectState(chestCavity)
    if (!state || !state.byEvent) return
    let tagIds = state.byEvent[eventId]
    if (!tagIds || tagIds.length == 0) return
    let strategyFuncList = []
    for (let i = 0; i < tagIds.length; i++) {
        let tagId = tagIds[i]
        let strategyModel = TagStrategyMap[tagId]
        if (!strategyModel) continue
        let eventStrategies = strategyModel.strategyMap[eventId]
        if (!eventStrategies || eventStrategies.length == 0) continue
        let count = state.counts[tagId]
        if (count == undefined || count == null) count = 0
        for (let j = 0; j < eventStrategies.length; j++) {
            strategyFuncList.push(new PriorityArgsModel(eventStrategies[j], args.concat(tagId, count)))
        }
    }
    if (strategyFuncList.length == 0) return
    strategyFuncList.sort((a, b) => b.getPriority() - a.getPriority())
    strategyFuncList.forEach((model) => {
        model.getFunc().apply(null, model.getArgs())
    })
}
