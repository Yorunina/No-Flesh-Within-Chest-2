// priority: 500

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.FoodEatenEventJS} event
 * @param {string} tagId
 * @param {number} count
 */
function FoodTagFoodEaten(customData, event, tagId, count) {
    const player = event.getPlayer()
    if (!player) return
    if (count >= 3) {
        player.potionEffects.add('farm_and_charm:sustenance', 20 * 30, 0, false, false)
    }
    if (count >= 6) {
        player.potionEffects.add('farm_and_charm:farmers_blessing', 20 * 30, 0, false, false)
    }
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:food')
        .addStrategy('food_eaten', FoodTagFoodEaten)
)