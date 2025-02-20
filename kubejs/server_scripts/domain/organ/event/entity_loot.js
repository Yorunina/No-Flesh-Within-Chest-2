// priority: 500
const OrganEntityLootEvent = new OrganEventModel('entity_loot')
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



LootJS.modifiers(context => {
    context.addLootTypeModifier(LootType.ENTITY)
        .apply(event => {
            const entity = event.killerEntity
            if (!entity) return
            let customData = {}
            OrganEntityLootEvent.run(entity, customData, [event])
        })
})
