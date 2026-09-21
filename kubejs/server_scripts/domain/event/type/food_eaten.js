// priority: 999
const OrganFoodEatenEvent = new OrganEventModel('food_eaten')
const TagFoodEatenStrategy = new TagEventModel('food_eaten')

ItemEvents.foodEaten(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganFoodEatenEvent.run(entity, customData, [event])
    TagFoodEatenStrategy.run(entity, customData, [event])
})