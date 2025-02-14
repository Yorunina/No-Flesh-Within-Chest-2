// priority: 801
const OrganChestCavityUpdateStrategy = new OrganStrategyModel()
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


ChestCavityEvents.evaluateChestCavity(event => {
    let customData = {}

    OrganChestCavityUpdateStrategy.run(event.chestCavity.inventory, [event], customData)
})

ServerEvents.tags('item', event => {
    event.add('kubejs:chest_cavity_update', Object.keys(OrganChestCavityUpdateStrategy.strategyMap))
    event.add('kubejs:chest_cavity_update_only', Object.keys(OrganChestCavityUpdateStrategy.onlyStrategyMap))
})

