// priority: 800
const EventId2TagId = {
    'item_right_clicked': 'kubejs:item_right_clicked',
    'entity_do_damage': 'kubejs:entity_do_damage',
    'chest_cavity_update': 'kubejs:chest_cavity_update',
    'food_eaten': 'kubejs:food_eaten',
    'block_broken': 'kubejs:block_broken',
    'entity_be_hurt': 'kubejs:entity_be_hurt',
    'player_enchant': 'kubejs:player_enchant',
    'entity_loot': 'kubejs:entity_loot',
    'chest_loot': 'kubejs:chest_loot',
    'entity_tick': 'kubejs:entity_tick',
    'iss_player_spell_cast': 'kubejs:iss_player_spell_cast',
    'entity_kill': 'kubejs:entity_kill',
    'entity_be_interacted': 'kubejs:entity_be_interacted',
    'entity_interact': 'kubejs:entity_interact',
    'block_right_clicked': 'kubejs:block_right_clicked',
    'organ_add_status_effect': 'kubejs:organ_add_status_effect',
    'exposure_frame_added': 'kubejs:exposure_frame_added',
    'entity_fall': 'kubejs:entity_fall',
    'villager_update_special_prices': 'kubejs:villager_update_special_prices',
    'shield_block': 'kubejs:shield_block',
    'entity_death': 'kubejs:entity_death',
}


ServerEvents.tags('item', event => {
    Object.keys(OrganStrategyMap).forEach(itemId => {
        Object.keys(OrganStrategyMap[itemId].strategyMap).forEach(eventId => {
            if (eventId == 'key_active') {
                event.add('kubejs:key_active', itemId)
                return
            }
            if (!EventId2TagId[eventId]) return
            let organStrategy = OrganStrategyMap[itemId].strategyMap[eventId]
            if (organStrategy['default'].length > 0) {
                event.add(EventId2TagId[eventId], itemId)
            } else if (organStrategy['only'].length > 0) {
                event.add(EventId2TagId[eventId] + '_only', itemId)
            }
        })
    })
})

