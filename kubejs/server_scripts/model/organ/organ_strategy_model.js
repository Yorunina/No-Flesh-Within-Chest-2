// priority: 2000
const $OrganEventIdType = 'item_right_clicked' || 'key_active' || 'entity_do_damage' || 'chest_cavity_update' || 'food_eaten' || 'block_broken' || 'entity_be_hurt' || 'player_enchant' || 'entity_loot' || 'chest_loot' || 'organ_take_off' || 'entity_tick' || 'organ_take_on' || 'entity_kill' || 'entity_death' || 'entity_be_interacted' || 'entity_interact' || 'decorate_chat' || 'chat' || 'iss_player_spell_cast' || 'iss_entity_spell_cast' || 'block_right_clicked' || 'organ_add_status_effect' || 'shield_block' || 'exposure_frame_added' || 'entity_fall' || 'villager_update_special_prices' || 'player_spawn_phantoms'

function OrganStrategyModel(itemId) {
    this.itemId = itemId
    /** @type {Object<string, Object<string, function(...any)[]>: void>} */
    this.strategyMap = {}
    return this
}

OrganStrategyModel.prototype = {
    /**
     * @param {$OrganEventIdType} eventId 
     * @param {any} func 
     * @param {number} priority
     * @returns 
     */
    addStrategy: function (eventId, func, priority) {
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[eventId]['default'].push(new PriorityFuncModel(func, priority))
        return this
    },
    /**
     * 
     * @param {$OrganEventIdType} eventId 
     * @param {any} func 
     * @param {number} priority
     * @returns 
     */
    addOnlyStrategy: function (eventId, func, priority) {
        if (!this.strategyMap[eventId]) {
            this.strategyMap[eventId] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[eventId]['only'].push(new PriorityFuncModel(func, priority))
        return this
    },
}
