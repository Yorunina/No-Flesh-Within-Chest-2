// priority: 2000
const $EventIdType = 'item_right_clicked' || 'player_tick' || 'key_active' || 'entity_do_damage' || 'chest_cavity_update' || 'item_eaten' || 'block_broken' || 'entity_be_hurt' || 'player_enchant' || 'entity_loot' || 'chest_loot' || 'organ_take_off' || 'mpm_render' || 'entity_tick' || 'organ_take_on'

function OrganStrategyModel(itemId) {
    this.itemId = itemId
    /** @type {Object<string, Object<string, function(...any)>: void>} */
    this.strategyMap = {}
    return this
}
OrganStrategyModel.prototype = {
    /**
     * 
     * @param {$EventIdType} eventId 
     * @param {*} func 
     * @returns 
     */
    addStrategy: function (eventId, func) {
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = {}
        }
        this.strategyMap[eventId]['default'] = func
        return this
    },
    /**
     * 
     * @param {$EventIdType} eventId 
     * @param {*} func 
     * @returns 
     */
    addOnlyStrategy: function (eventId, func) {
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = {}
        }
        this.strategyMap[eventId]['only'] = func
        return this
    },
}
