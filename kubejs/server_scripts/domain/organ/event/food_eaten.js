// priority: 801
const OrganFoodEatenStrategy = new OrganStrategyModel()
    .setInit(
        /** 
         * @param {any} customData
         * @param {Internal.FoodEatenEventJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {any} customData
         * @param {Internal.FoodEatenEventJS} event
         */
        (customData, event) => {
        }
    )


ItemEvents.foodEaten(event => {
    let customData = {}
    OrganFoodEatenStrategy.run(GetEntityChestCavityInventory(event.entity), [event], customData)
})

ServerEvents.tags('item', event => {
    event.add('kubejs:item_eaten', Object.keys(OrganFoodEatenStrategy.strategyMap))
    event.add('kubejs:item_eaten_only', Object.keys(OrganFoodEatenStrategy.onlyStrategyMap))
})

