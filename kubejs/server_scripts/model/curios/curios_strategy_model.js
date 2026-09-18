// priority: 2000
const $CuriosEventIdType = 'entity_spawned' || 'entity_death' || 'entity_kill' || 'entity_loot' || 'chest_loot' || 'new_day' || 'player_tick' || 'xp_level_change'

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
