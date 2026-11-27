// priority: 2000

/** @typedef {'projectile' | 'mainhand' | 'offhand' | 'curios' | 'armor'} TetraEffectSourceLocation */
/** @typedef {{handler: PriorityFuncModel, availableSources: TetraEffectSourceLocation[] | null | undefined}} TetraEffectStrategy */

/**
 * @param {string} effectId 武器效果或行为标识
 */
function TetraEffectStrategyModel(effectId) {
    this.effectId = effectId
    /** @type {Object<string, {default: TetraEffectStrategy[], only: TetraEffectStrategy[]}>} */
    this.strategyMap = {}
    return this
}

TetraEffectStrategyModel.prototype = {
    /**
     * @param {string} eventId
     * @param {Function} func 策略参数为 customData、事件参数和当前 effectSource（stack、level、efficiency、location）
     * @param {TetraEffectSourceLocation[] | null} [availableSources] 省略或为空时允许所有来源
     * @param {number} [priority=0] 数字越大越先执行
     * @returns {TetraEffectStrategyModel}
     */
    addStrategy: function (eventId, func, availableSources, priority) {
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[eventId]['default'].push({
            handler: new PriorityFuncModel(func, priority),
            availableSources: availableSources,
        })
        return this
    },
    /**
     * 在符合来源限制的 effect 中选等级最高的一个。
     * @param {string} eventId
     * @param {Function} func
     * @param {TetraEffectSourceLocation[] | null} [availableSources]
     * @param {number} [priority=0]
     * @returns {TetraEffectStrategyModel}
     */
    addOnlyStrategy: function (eventId, func, availableSources, priority) {
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[eventId]['only'].push({
            handler: new PriorityFuncModel(func, priority),
            availableSources: availableSources,
        })
        return this
    },
}
