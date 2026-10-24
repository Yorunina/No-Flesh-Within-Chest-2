// priority: 2000
function TetraOrganEffectModel(effectId) {
    this.effectId = effectId
    /**@type {Object<string, PriorityFuncModel[]>} */
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
        if (!this.strategyMap[eventId]) this.strategyMap[eventId] = []
        this.strategyMap[eventId].push(new PriorityFuncModel(func, priority))
        return this
    },
}