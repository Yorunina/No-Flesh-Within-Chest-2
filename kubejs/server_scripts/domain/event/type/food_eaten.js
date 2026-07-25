// priority: 999
const OrganFoodEatenEvent = new OrganEventModel('food_eaten')

ItemEvents.foodEaten(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganFoodEatenEvent.run(entity, customData, [event])
})
