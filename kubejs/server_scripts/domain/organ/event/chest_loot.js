// priority: 500
const OrganChestLootEvent = new OrganEventModel('chest_loot')
    .setInit(
        /** 
         * @param {OrganEventCustomData} customData
         * @param {Internal.FoodEatenEventJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {OrganEventCustomData} customData
         * @param {Internal.FoodEatenEventJS} event
         */
        (customData, event) => {
        }
    )


LootJS.modifiers(context => {
    context.addLootTypeModifier(LootType.CHEST)
        .apply(event => {
            const player = event.player
            if (!player) return
            let customData = {}
            OrganChestLootEvent.run(player, customData, [event])
        })
})



