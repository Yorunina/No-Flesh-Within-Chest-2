// priority: 2000

/**
 * @param {string} effectId 武器效果或行为标识
 */
function TetraEffectStrategyModel(effectId) {
    this.effectId = effectId
    /** @type {Object<string, PriorityFuncModel[]>} */
    this.strategyMap = {}
    return this
}

TetraEffectStrategyModel.prototype = {
    /**
     * @param {string} eventId
     * @param {Function} func 策略参数为 customData、event
     * @param {number} [priority=0] 数字越大越先执行
     * @returns {TetraEffectStrategyModel}
     */
    addStrategy: function (eventId, func, priority) {
        if (!this.strategyMap[eventId]) this.strategyMap[eventId] = []
        this.strategyMap[eventId].push(new PriorityFuncModel(func, priority))
        return this
    },
}
