// priority: 2000
const $ChampionEventIdType = 'entity_be_hurt' || 'entity_tick' || 'entity_death' || 'entity_kill' || 'entity_spawned'

function ChampionStrategyModel(id) {
    /** @type {String} */
    this.id = id
    /** @type {Object<string, Object<string, function(...any)[]>: void>} */
    this.strategyMap = {}
    return this
}

ChampionStrategyModel.prototype = {
    /**
     * @param {$ChampionEventIdType} eventId 
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
