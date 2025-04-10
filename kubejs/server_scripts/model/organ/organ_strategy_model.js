// priority: 2000
const $EventIdType = 'item_right_clicked' || 'key_active' || 'entity_do_damage' || 'chest_cavity_update' || 'item_eaten' || 'block_broken' || 'entity_be_hurt' || 'player_enchant' || 'entity_loot' || 'chest_loot' || 'organ_take_off' || 'mpm_render' || 'entity_tick' || 'organ_take_on' || 'entity_kill' || 'entity_death'

function OrganStrategyModel(itemId) {
    this.itemId = itemId
    /** @type {Object<string, Object<string, function(...any)[]>: void>} */
    this.strategyMap = {}
    return this
}
OrganStrategyModel.prototype = {
    /**
     * 
     * @param {$EventIdType} eventId 
     * @param {any} func 
     * @param {number} priority
     * @returns 
     */
    addStrategy: function (eventId, func, priority) {
        priority = priority ? priority: 0
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[eventId]['default'].push({
            'func': func,
            'priority': priority,
        }) 
        return this
    },
    /**
     * 
     * @param {$EventIdType} eventId 
     * @param {any} func 
     * @param {number} priority
     * @returns 
     */
    addOnlyStrategy: function (eventId, func, priority) {
        priority = priority ? priority: 0
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[eventId]['only'].push({
            'func': func,
            'priority': priority,
        })
        return this
    },
}
