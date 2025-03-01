// priority: 800
const EventId2TagId = {
    'item_right_clicked': 'kubejs:item_right_clicked',
    'player_tick': 'kubejs:player_tick',
    'key_active': 'kubejs:key_active',
    'entity_do_damage': 'kubejs:entity_do_damage',
    'chest_cavity_update': 'kubejs:chest_cavity_update',
    'item_eaten': 'kubejs:item_eaten',
    'block_broken': 'kubejs:block_broken',
    'entity_be_hurt': 'kubejs:entity_be_hurt',
    'player_enchant': 'kubejs:player_enchant',
    'entity_loot': 'kubejs:entity_loot',
    'chest_loot': 'kubejs:chest_loot',
    'entity_tick': 'kubejs:entity_tick',
}


ServerEvents.tags('item', event => {
    Object.keys(OrganStrategyMap).forEach(itemId => {
        Object.keys(OrganStrategyMap[itemId].strategyMap).forEach(eventId => {
            if (!EventId2TagId[eventId]) return
            let organStrategy =  OrganStrategyMap[itemId].strategyMap[eventId]
            if (organStrategy['default']) {
                event.add(EventId2TagId[eventId], itemId)
            } else if (organStrategy['only']) {
                event.add(EventId2TagId[eventId] + '_only', itemId)
            }
        })
    })
})

