// priority: 2000
/**
 * @typedef {
 *     'item_right_clicked'
 *     | 'item_left_clicked'
 *     | 'key_active'
 *     | 'entity_do_damage'
 *     | 'entity_final_damage'
 *     | 'chest_cavity_update'
 *     | 'food_eaten'
 *     | 'block_broken'
 *     | 'entity_be_hurt'
 *     | 'player_enchant'
 *     | 'entity_loot'
 *     | 'chest_loot'
 *     | 'organ_take_off'
 *     | 'entity_tick'
 *     | 'organ_take_on'
 *     | 'entity_kill'
 *     | 'entity_death'
 *     | 'entity_be_interacted'
 *     | 'entity_interact'
 *     | 'decorate_chat'
 *     | 'chat'
 *     | 'iss_player_spell_cast'
 *     | 'iss_entity_spell_cast'
 *     | 'block_right_clicked'
 *     | 'item_cooldown_started'
 *     | 'organ_add_status_effect'
 *     | 'shield_block'
 *     | 'exposure_frame_added'
 *     | 'entity_fall'
 *     | 'villager_update_special_prices'
 *     | 'player_spawn_phantoms'
 *     | 'player_dodge'
     *     | 'damage_dodge'
 *     | 'trade_with_villager'
 *     | 'player_respawned'
 * } $OrganEventIdType
 */

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
     * @param {number} priority 优先级
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

/**
 * @param {Internal.ItemStack} item 
 * @param {String} slotType 
 * @returns {boolean}
 */
function IsItemNeedKeyActive(item, slotType) {
    if (item.hasTag('kubejs:key_active')) return true
    return false
}

/**
 * @param {Internal.ServerPlayer} player
 * @param {string} type
 * @param {number} slot
 * @param {Internal.ItemStack} [item] add 时传入胸腔内的物品，用于轮盘图标
 */
function SendOrganSkillWheelItem(player, type, slot, item) {
    let data = new $CompoundTag()
    data.putString('type', type)
    data.putInt('slot', slot)
    if (item) {
        let wheelItem = item.copy()
        let wheelData = new $CompoundTag()
        wheelData.putInt('slot', slot)
        wheelItem.getOrCreateTag().put('kubejs_skill_wheel', wheelData)
        data.put('stack', wheelItem.save(new $CompoundTag()))
    }
    EnqueueSendData(player, 'update_organ_skill_wheel_item', data)
}
