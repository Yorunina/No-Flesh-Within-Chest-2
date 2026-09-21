// priority: 2000
/**
 * Tag 羁绊。内容：server_scripts/domain/organ/tag_effect/<tag>.js（priority 500）
 * 签名：(customData, event, tagId, count)
 * 件数在 evaluateChestCavity 写入 customDataMap.tagEffect。
 * 已派发：chest_cavity_update、food_eaten、mob_effect_applicable。
 */
const TagEffectStateKey = 'tagEffect'

function TagStrategyModel(tagId) {
    this.tagId = tagId
    /** @type {Object<string, PriorityFuncModel[]>} */
    this.strategyMap = {}
    return this
}

TagStrategyModel.prototype = {
    /**
     * @param {$OrganEventIdType} eventId
     * @param {any} func
     * @param {number} priority
     */
    addStrategy: function (eventId, func, priority) {
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = []
        }
        this.strategyMap[eventId].push(new PriorityFuncModel(func, priority))
        return this
    },
}

function GetTagEffectState(chestCavity) {
    if (!chestCavity) return null
    return GetCustomDataMap(chestCavity, TagEffectStateKey, null)
}

function GetTagCount(chestCavity, tagId) {
    let state = GetTagEffectState(chestCavity)
    if (!state || !state.counts) return 0
    let count = state.counts[tagId]
    return count ? count : 0
}

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
        let count = chestCavity.inventory.count('#' + tagId)
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
