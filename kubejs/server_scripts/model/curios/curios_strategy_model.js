// priority: 2000
const $CuriosEventIdType = 'entity_spawned' || 'entity_death' || 'entity_kill' || 'chest_loot' || 'new_day'

function CuriosStrategyModel(id) {
    /** @type {String} */
    this.itemId = id
    /** @type {Object<string, Object<string, function(...any)[]>: void>} */
    this.strategyMap = {}
    return this
}

CuriosStrategyModel.prototype = {
    /**
     * @param {$CuriosEventIdType} eventId 
     * @param {any} func 
     * @param {number} priority
     * @returns 
     */
    addStrategy: function (eventId, func, priority) {
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = []
        }
        this.strategyMap[eventId].push(new PriorityFuncModel(func, priority))
        return this
    },
}
