// priority: 2000

/**
 * @typedef {Object} TetraEffectEventStrategy
 * @property {string} effectId
 * @property {PriorityFuncModel} strategy
 * @property {number} index 登记顺序，用于同优先级排序
 */

/**
 * @param {string} eventId
 */
function TetraEffectEventModel(eventId) {
    this.eventId = eventId
    /** @type {TetraEffectEventStrategy[] | null} */
    this.strategies = null
    return this
}

TetraEffectEventModel.prototype = {
    /**
     * 首次分发时收集策略，避免入口先于效果脚本加载时取得空清单。
     * @returns {TetraEffectEventStrategy[]}
     */
    getStrategies: function () {
        if (this.strategies != null) return this.strategies
        let strategies = []
        Object.keys(TetraEffectStrategyMap).forEach(effectId => {
            let eventStrategies = TetraEffectStrategyMap[effectId].strategyMap[this.eventId]
            if (!eventStrategies) return
            eventStrategies.forEach(strategy => {
                strategies.push({ effectId: effectId, strategy: strategy, index: strategies.length })
            })
        })
        strategies.sort((a, b) => {
            return b.strategy.getPriority() - a.strategy.getPriority() || a.index - b.index
        })
        this.strategies = strategies
        return strategies
    },
    /**
     * 逐策略隔离普通异常，事件中断继续向外传播。
     * @param {Object} customData 本次分发的临时数据
     * @param {any[]} args 事件及附加参数
     * @param {boolean} [stopOnCanceled] 原生事件取消后是否停止后续策略
     */
    run: function (customData, args, stopOnCanceled) {
        let strategyArgs = [customData].concat(args)
        let strategies = this.getStrategies()
        for (let i = 0; i < strategies.length; i++) {
            if (stopOnCanceled && args[0].isCanceled()) break
            let entry = strategies[i]
            let func = entry.strategy.getFunc()
            try {
                func.apply(null, strategyArgs)
            } catch (err) {
                HandleStrategyError(err, this.eventId, entry.effectId)
            }
        }
    },
}
