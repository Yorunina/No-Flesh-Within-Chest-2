// priority: 1000
const $EventIdType = 'item_right_clicked' || 'player_tick' || 'key_pressed' || 'entity_do_damage' || 'chest_cavity_update' || 'item_eaten' || 'block_broken' || 'entity_be_hurt' || 'player_enchant' || 'entity_loot' || 'chest_loot' || 'organ_take_off' || 'mpm_render'

function OrganStrategyModel(itemId) {
    this.itemId = itemId
    /** @type {Object.<string, Function>} */
    this.strategyMap = {}
    /** @type {Object.<string, Function>} */
    this.onlyStrategyMap = {}
    this.relatedEventIds = []
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
        this.strategyMap[eventId] = func
        AddIfNotExist(this.relatedEventIds, eventId)
        return this
    },
    /**
     * 
     * @param {$EventIdType} eventId 
     * @param {*} func 
     * @returns 
     */
    addOnlyStrategy: function (eventId, func) {
        this.onlyStrategyMap[eventId] = func
        AddIfNotExist(this.relatedEventIds, eventId)
        return this
    },
}
