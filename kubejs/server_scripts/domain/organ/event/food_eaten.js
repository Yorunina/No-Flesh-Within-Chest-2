// priority: 999
const OrganFoodEatenEvent = new OrganEventModel('item_eaten')

ItemEvents.foodEaten(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganFoodEatenEvent.run(entity, customData, [event])
    UpdateClientISSSpellDataEvent(customData, entity)
})

