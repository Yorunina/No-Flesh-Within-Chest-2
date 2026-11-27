// priority: 999
const TetraBlockLootEvent = new TetraEffectEventModel('block_loot')

LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.BLOCK)
        .apply(/** @param {Internal.LootContextJS} ctx */ ctx => {
            let customData = {}
            TetraBlockLootEvent.run(ctx.entity, customData, [ctx])
        })
})
