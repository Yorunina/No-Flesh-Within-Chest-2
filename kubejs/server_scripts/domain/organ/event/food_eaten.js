// priority: 500
publicField.NFWC.events.OrganFoodEatenEvent = new OrganEventModel('item_eaten')

const OrganFoodEatenEvent = publicField.NFWC.events.OrganFoodEatenEvent
ItemEvents.foodEaten(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganFoodEatenEvent.run(entity, customData, [event])
})

